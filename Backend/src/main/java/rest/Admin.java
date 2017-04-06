package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import facades.UserFacade;
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
import jsonMappers.jsonUser;

@Path("user")
//@RolesAllowed("Admin")
public class Admin {

    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    UserFacade uf = new UserFacade("pu_development");

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getUsers() {
        try {
            List<jsonUser> jList = new ArrayList();
            for (entity.User user : uf.getUsers()) {
                jList.add(new jsonUser(user));
            }
            return gson.toJson(jList);
        } catch (Exception e) {
            throw null;
        }
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String createUser(String content) {
        try {
            entity.User user = gson.fromJson(content, entity.User.class);
            entity.User user1 = new entity.User(user.getUserName(), user.getPassword());
            user1.addRole(user.getRoles().get(0));
            uf.createUser(user1);
            return "{\"isSucced\" : \"Created\"}";
        } catch (Exception e) {
            throw null;
        }
    }

    @DELETE
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public String deleteUser(@PathParam("id") String id) {
        try {
            uf.deleteUser(id);
            return "{\"isSucced\" : \"Deleted\"}";
        } catch (Exception e) {
            throw null;
        }
    }

}
