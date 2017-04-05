package jsonMappers;

import entity.Role;
import entity.User;
import java.util.ArrayList;
import java.util.List;

public class jsonUser {

    private String passwordHash;

    private String userName;

    List<jsonRole> roles = new ArrayList();

    public jsonUser() {
    }

    public jsonUser(User user) {
        this.userName = user.getUserName();
        this.passwordHash = user.getPassword();
        
        for (Role role : user.getRoles()) {
            roles.add(new jsonRole(role));
        }
    }
}
