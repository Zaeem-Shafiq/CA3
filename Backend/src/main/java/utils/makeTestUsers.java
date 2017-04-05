package utils;

import entity.Role;
import entity.User;
import facades.UserFacade;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import security.PasswordStorage;

public class makeTestUsers {

    //Only for initial testing REMOVE BEFORE PRODUCTION
    //Run this file to setup the users required to use the initial version of the seed
    public static void main(String[] args) {
        EntityManager em = Persistence.createEntityManagerFactory("pu_development").createEntityManager();
        try {
            if (em.find(User.class, "user") == null) {
                System.out.println("Creating TEST Users");
                em.getTransaction().begin();
                Role userRole = new Role("User");
                Role adminRole = new Role("Admin");
                User user = new User("user", "test");
                user.addRole(userRole);
                User admin = new User("admin", "test");
                admin.addRole(adminRole);
                User both = new User("user_admin", "test");
                both.addRole(userRole);
                both.addRole(adminRole);
                String userPassword = PasswordStorage.createHash(user.getPassword());
                String adminPassword = PasswordStorage.createHash(admin.getPassword());
                String bothPassword = PasswordStorage.createHash(both.getPassword());
                user.setPassword(userPassword);
                admin.setPassword(adminPassword);
                both.setPassword(bothPassword);
                em.persist(userRole);
                em.persist(adminRole);
                em.persist(user);
                em.persist(admin);
                em.persist(both);
                em.getTransaction().commit();
                System.out.println("Created TEST Users");
            }
        } catch (Exception ex) {
            Logger.getLogger(UserFacade.class.getName()).log(Level.SEVERE, null, ex);
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
    }
}
