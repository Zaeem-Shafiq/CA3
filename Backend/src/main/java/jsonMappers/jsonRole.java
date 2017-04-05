package jsonMappers;

import entity.Role;

public class jsonRole {

    private String roleName;

    public jsonRole(Role role) {
        this.roleName = role.getRoleName();
    }
}
