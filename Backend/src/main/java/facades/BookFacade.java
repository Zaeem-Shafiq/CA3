package facades;

import entity.Book;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.RollbackException;

public class BookFacade {

    EntityManagerFactory emf;

    public BookFacade(EntityManagerFactory emf) {
        this.emf = emf;
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public Book getBookById(int id) {
        EntityManager em = getEntityManager();
        return em.find(Book.class, id);
    }

    public Book createBook(Book book) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(book);
            em.getTransaction().commit();
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return getBookById(book.getId());
    }

    public Book updateBook(Book book) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            book = em.merge(book);
            em.getTransaction().commit();
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return book;
    }

    public boolean deleteBook(int id) {
        EntityManager em = getEntityManager();
        Book person = getBookById(id);
        try {
            em.getTransaction().begin();
            //person = em.merge(person);
            em.remove(person);
            em.getTransaction().commit();
        } catch (RollbackException r) {
            em.getTransaction().rollback();
            return false;
        } finally {
            em.close();
        }
        return true;
    }
}
