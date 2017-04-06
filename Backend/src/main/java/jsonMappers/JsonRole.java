package jsonMappers;

import entity.Role;

public class JsonRole {

    private String roleName;

    public JsonRole(Role role) {
        this.roleName = role.getRoleName();
    }
}
