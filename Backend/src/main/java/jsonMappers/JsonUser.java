package jsonMappers;

import entity.Role;
import entity.User;
import java.util.ArrayList;
import java.util.List;

public class JsonUser {

    private String passwordHash;

    private String userName;

    List<JsonRole> roles = new ArrayList();

    public JsonUser() {
    }

    public JsonUser(User user) {
        this.userName = user.getUserName();
        this.passwordHash = user.getPassword();

        for (Role role : user.getRoles()) {
            roles.add(new JsonRole(role));
        }
    }
}
