package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import facades.BookFacade;
import java.util.List;
import entity.Book;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;

@Path("book")
public class BookResource {

    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    BookFacade bf = new BookFacade("pu_development");

    @Context
    private UriInfo context;

    public BookResource() {
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllBooks() {
        try {
            List<Book> books = bf.getBooks();
            return gson.toJson(books);
        } catch (Exception e) {
            throw null;
        }
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getBookById(@PathParam("id") int id) {
        try {
            return gson.toJson(bf.getBookById(id));
        } catch (Exception e) {
            throw null;
        }
    }

    @PUT
    @RolesAllowed("User")
    @Consumes(MediaType.APPLICATION_JSON)
    public String updateBook(String content) {
        try {
            Book book = gson.fromJson(content, Book.class);
            bf.updateBook(book);
            return "{\"isSucced\" : \"Updated\"}";
        } catch (Exception e) {
            throw null;
        }
    }

    @POST
    @RolesAllowed("User")
    @Consumes(MediaType.APPLICATION_JSON)
    public String createBook(String content) {
        try {
            Book book = gson.fromJson(content, Book.class);
            bf.createBook(book);
            return "{\"isSucced\" : \"Created\"}";
        } catch (Exception e) {
            System.out.println("fail: " + e.getMessage());
            throw null;
        }
    }

    @DELETE
    @Path("{id}")
//    @RolesAllowed("User")
    @Consumes(MediaType.APPLICATION_JSON)
    public String deleteBook(@PathParam("id") int id) {
        System.out.println("first id: " + id);
        try {
            System.out.println(bf.deleteBook(id));
            System.out.println("second id: " + id);
            return "{\"isSucced\" : \"Deleted\"}";
        } catch (Exception e) {
            throw null;
        }
    }
}
