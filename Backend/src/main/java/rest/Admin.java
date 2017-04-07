package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;
import facades.UserFacade;
import httpErrors.UserNotFoundException;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import jsonMappers.JsonUser;
import security.PasswordStorage;

@Path("user")
@RolesAllowed("Admin")
public class Admin {

    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    UserFacade uf = new UserFacade("pu_development");

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getUsers() throws UserNotFoundException {
        try {
            List<JsonUser> jList = new ArrayList();
            for (entity.User user : uf.getUsers()) {
                jList.add(new JsonUser(user));
            }
            return gson.toJson(jList);
        } catch (Exception e) {
            throw new UserNotFoundException("Users not found");
        }
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String createUser(String content) throws UserNotFoundException {
        try {
            entity.User user = gson.fromJson(content, entity.User.class);
            entity.User user1 = new entity.User(user.getUserName(), user.getPassword());
            user1.addRole(user.getRoles().get(0));
            uf.createUser(user1);
            return "{\"isSucced\" : \"Created\"}";
        } catch (JsonSyntaxException | PasswordStorage.CannotPerformOperationException e) {
            throw new UserNotFoundException(e.getMessage());
        }
    }

    @DELETE
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public String deleteUser(@PathParam("id") String id) throws UserNotFoundException {
        try {
            uf.deleteUser(id);
            return "{\"isSucced\" : \"Deleted\"}";
        } catch (Exception e) {
            throw new UserNotFoundException("User not found");
        }
    }

}
