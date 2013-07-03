package derp;

public class Session {
    
    private static String login;
    private static String status;
    
    public Session(String login, String status) {
	Session.login = login;
	Session.status = status;
	System.out.println(Session.login + " " + Session.status);
    }
    
    public static String getLogin() {
	return Session.login;
    }
    
    public static String getStatus() {
	return Session.status;
    }
    
    public static void destroy() {
	Session.login = null;
	Session.status = null;
    }
    
    public String toString() {
	return("Login : " + Session.login + "\nStatut : " + Session.status);
    }    
}
