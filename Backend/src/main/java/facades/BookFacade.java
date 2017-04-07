package facades;

import entity.Book;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.RollbackException;

public class BookFacade {

    EntityManagerFactory emf;

    public BookFacade(String persistence) {
        this.emf = Persistence.createEntityManagerFactory(persistence);
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public Book getBookById(int id) {
        EntityManager em = getEntityManager();
        return em.find(Book.class, id);
    }

    public List<Book> getBooks() {
        EntityManager em = getEntityManager();
        return em.createQuery("SELECT b FROM Book b", Book.class).getResultList();
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
        Book bookInDB = getBookById(book.getId());
        try {
            em.getTransaction().begin();
            bookInDB = em.merge(book);
            em.getTransaction().commit();
        } catch (RollbackException r) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return bookInDB;
    }

    public boolean deleteBook(int id) {
        EntityManager em = getEntityManager();
        Book book = getBookById(id);
        System.out.println(id);
        try {
            em.getTransaction().begin();
            book = em.merge(book);
            em.remove(book);
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
