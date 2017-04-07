package test;

import com.google.gson.Gson;
import entity.Book;
import facades.BookFacade;
import org.junit.BeforeClass;
import io.restassured.RestAssured;
import static io.restassured.RestAssured.*;
import io.restassured.parsing.Parser;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import javax.servlet.ServletException;
import org.apache.catalina.LifecycleException;
import static org.hamcrest.CoreMatchers.equalTo;
import org.junit.AfterClass;
import org.junit.Test;
import test.utils.EmbeddedTomcat;

public class RestIntegrationTest {

    private static final int SERVER_PORT = 9999;
    private static final String APP_CONTEXT = "/seed";
    private static EmbeddedTomcat tomcat;

    public RestIntegrationTest() {
    }
    private static String securityToken;

    //Utility method to login and set the securityToken
    private static void login(String role, String password) {
        String json = String.format("{username: \"%s\", password: \"%s\"}", role, password);
        System.out.println(json);
        securityToken = given()
                .contentType("application/json")
                .body(json)
                .when().post("/api/login")
                .then()
                .extract().path("token");
        System.out.println("Token: " + securityToken);

    }

    private void logOut() {
        securityToken = null;
    }

    @BeforeClass
    public static void setUpBeforeAll() throws ServletException, MalformedURLException, LifecycleException {
        tomcat = new EmbeddedTomcat();
        tomcat.start(SERVER_PORT, APP_CONTEXT);
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = SERVER_PORT;
        RestAssured.basePath = APP_CONTEXT;
        RestAssured.defaultParser = Parser.JSON;
    }

    @AfterClass
    public static void after() throws ServletException, MalformedURLException, LifecycleException, IOException {
        tomcat.stop();
    }

    @Test
    public void testRestNoAuthenticationRequired() {
        given()
                .contentType("application/json")
                .when()
                .get("/api/demoall").then()
                .statusCode(200)
                .body("message", equalTo("result for all"));
    }

    @Test
    public void testGetBook() {
        given()
                .pathParam("id", 1)
                .when().get("api/book/{id}")
                .then()
                .statusCode(200)
                .body("id", equalTo(1));
    }

    @Test
    public void testUpdateBook() {
        login("user", "test");
        BookFacade b = new BookFacade("pu_development");
        Book book = b.getBookById(1);
        book.setTitle("bobby");
        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + securityToken)
                .body(new Gson().toJson(book))
                .when()
                .put("api/book")
                .then()
                .statusCode(200);
    }

    @Test
    public void testCreateBook() {
        BookFacade bf = new BookFacade("pu_development");
        Book b = new Book("title", "info", "more info");
        login("user", "test");
        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + securityToken)
                .body(new Gson().toJson(b))
                .when()
                .post("api/book")
                .then()
                .statusCode(200);
        List<Book> bookList = bf.getBooks();
        int idToDelete = bookList.get(bookList.size()-1).getId();
        bf.deleteBook(idToDelete);
        
        
    }

    @Test
    public void testDeleteBook() {
        BookFacade bf = new BookFacade("pu_development");
        Book b = new Book("title", "info", "more info");
        bf.createBook(b);
        System.out.println(b.getId());
        List<Book> bookList = bf.getBooks();
        System.out.println(bookList.size());
        int idToDelete = bookList.get(bookList.size()-1).getId();
        System.out.println(idToDelete);
        login("user", "test");
        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + securityToken)
                .delete("api/book/"+idToDelete+"/")
                .then()
                .statusCode(200);
        System.out.println(bf.getBooks().size());
    }

    @Test
    public void testRestForUser() {
        login("user", "test");
        given()
                .contentType("application/json")
                .header("Authorization", "Bearer " + securityToken)
                .when()
                .get("/api/demouser")
                .then()
                .statusCode(200)
                .body("message", equalTo("Hello User from Server (Accesible by only authenticated USERS)"));
    }

    @Test
    public void userNotAuthenticated() {
        logOut();
        given()
                .contentType("application/json")
                .when()
                .get("/api/user").then()
                .statusCode(401)
                .body("error.message", equalTo("No authorization header provided"));
    }

}
