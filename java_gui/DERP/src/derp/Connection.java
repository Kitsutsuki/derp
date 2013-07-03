/* The class in which events from socket.io are received. */
package derp;

import io.socket.IOAcknowledge;
import io.socket.IOCallback;
import io.socket.SocketIO;
import io.socket.SocketIOException;
import java.awt.HeadlessException;
import javax.swing.JComboBox;
import javax.swing.JOptionPane;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Connection implements IOCallback {

    private SocketIO socket;
    private Frame frame;

    public Connection(SocketIO socket, Frame frame) {
	this.socket = socket;
	this.frame = frame;
    }

    public void onMessage(JSONObject json, IOAcknowledge ack) {
	try {
	    System.out.println("Server said:" + json.toString(2));
	} catch (JSONException e) {
	    e.printStackTrace(System.out);
	}
    }

    /* Reception of events "socket.send" */
    public void onMessage(String data, IOAcknowledge ack) {
	try {
	    switch (data) {
		case "not connected":
		    JOptionPane.showMessageDialog(null, "Mauvaise combinaison identifiant/mot de passe", "Erreur", JOptionPane.ERROR_MESSAGE);
		    break;
		case "jobRedirect":
		    socket.emit("message", Job.getList());
		    break;
		case "groupRedirect":
		    socket.emit("message", Group.getList());
		    break;
		case "workerRedirect":
		    socket.emit("message", Worker.getList());
		    break;
		case "userRedirect":
		    socket.emit("message", User.getList());
		    break;

	    }
	    System.out.println("Server said: " + data);
	} catch (JSONException ex) {
	    ex.printStackTrace(System.out);
	}
    }

    public void onError(SocketIOException socketIOException) {
	System.out.println("an Error occured");
	socketIOException.printStackTrace(System.out);
    }

    public void onDisconnect() {
	System.out.println("Connection terminated.");
    }

    public void onConnect() {
	System.out.println("Connection established");
    }

    /* Reception of events "socket.emit" */
    public void on(String event, IOAcknowledge ack, Object... args) {

	/* 
	 * The argument args is a table and contains data sent through the event.
	 * Our data are mainly JSONArray (an array of JSONObject).
	 */
	try {

	    /* Getting the data and parsing it into JSONArray. */
	    JSONArray ja = new JSONArray();
	    if (JSONArray.class.isInstance(args[0])) {
		ja = (JSONArray) (args[0]);
	    }

	    /* If the data are not JSONArray (doesn't work yet). */

	    /*else {
	    int n = (int) args[1];
	    
	    String raw_data[] = args[0].toString().replaceAll("\\[|\\{|\\]|\\}", "").split("(,\")|(\":)");
	    String donnees[] = new String[raw_data.length / 2];
	    
	    for (int i = 0; i < raw_data.length; i++) {
	    raw_data[i] = raw_data[i].replace("\"", "");
	    if (i % 2 != 0) {
	    donnees[(i - 1) / 2] = raw_data[i];
	    }
	    }
	    
	    
	    Object[][] data = new Object[donnees.length / n][n];
	    
	    for (int i = 0; i < donnees.length / n; i++) {
	    for (int j = 0; j < n; j++) {
	    data[i][j] = donnees[n * i + j];
	    }
	    }
	    }*/

	    switch (event) {

		case "connected":
		    /* 
		     * If the event is a connection, a new object Session is created.
		     * args[0] is the login and args[1] is the status.
		     * Then, the list of jobs is called.
		     */
		    Session session = new Session((String) args[0], (String) args[1]);
		    socket.emit("message", Job.getList());
		    break;

		/* 
		 * An array of objects Job|Worker|User|Group is creatd from the JSONObjects contained in the JSONArray.
		 * The list of jobs|workers|groups|users is displayed. 
		 */
		case "jobs":
		    Job job_list[] = new Job[ja.length()];
		    for (int i = 0; i < ja.length(); i++) {
			job_list[i] = new Job((JSONObject) ja.get(i));
		    }
		    frame.setPanel(new JobPanel(job_list, socket, frame));
		    break;

		case "workers":
		    Worker worker_list[] = new Worker[ja.length()];
		    for (int i = 0; i < ja.length(); i++) {
			worker_list[i] = new Worker((JSONObject) ja.get(i));
		    }
		    frame.setPanel(new WorkerPanel(worker_list, socket, frame));
		    break;

		case "groups":
		    Group group_list[] = new Group[ja.length()];
		    for (int i = 0; i < ja.length(); i++) {
			group_list[i] = new Group((JSONObject) ja.get(i));
		    }
		    frame.setPanel(new GroupPanel(group_list, socket, frame));
		    break;

		case "users":
		    User user_list[] = new User[ja.length()];
		    for (int i = 0; i < ja.length(); i++) {
			user_list[i] = new User((JSONObject) ja.get(i));
		    }
		    frame.setPanel(new UserPanel(user_list, socket, frame));
		    break;

		case "groupNames":
		    /* 
		     * This one is used when we want to change the group of a worker.
		     * It fetches the name of each group and display a ComboBox with it.
		     * It is necessary because if the user doesn't display the list of groups before the list of workers,
		     * the array of groups is not instanciated. Therefore, if we wanted to use this array to display
		     * the name of each group, it would return a null.
		     */
		    String list[] = new String[ja.length()];
		    for (int i = 0; i < ja.length(); i++) {
			list[i] = ((JSONObject) ja.get(i)).getString("name");
		    }
		    JComboBox jcb = new JComboBox(list);
		    JOptionPane.showMessageDialog(null, jcb, "Selectionner un groupe", JOptionPane.QUESTION_MESSAGE);
		    socket.emit("message", Worker.update(((WorkerPanel) frame.getContentPane()).getSelectedId(), (String) jcb.getSelectedItem()));
		    break;
	    }

	} catch (JSONException | HeadlessException ex) {
	    ex.printStackTrace(System.out);
	}
    }
}
