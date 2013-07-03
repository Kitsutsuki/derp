/*
 * Main class of the project.
 */
package derp;

import java.net.MalformedURLException;
import javax.swing.JOptionPane;

public class DERP {

    public static void main(String[] args) throws MalformedURLException {
	/*
	 * This is used to connect to the server.
	 * Only one address right now, the other is not impelmented yet.
	 */
	Object[] values = {"http://127.0.0.1:7776/"};
	String address = (String) JOptionPane.showInputDialog(null, "Veuillez entrer l'adresse du serveur central", "Connection au serveur", JOptionPane.QUESTION_MESSAGE, null, values, "http://127.0.0.1:7776/");
	if (address != null && !"".equals(address)) {
	    final Frame frame = new Frame(address);
	}
    }
}
