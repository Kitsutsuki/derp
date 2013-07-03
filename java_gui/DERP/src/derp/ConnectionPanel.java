/*
 * The first panel we ever met ! 
 * Displayed on the connection window.
 */
package derp;

import io.socket.SocketIO;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.GroupLayout;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import org.json.JSONException;
import org.json.JSONObject;

class ConnectionPanel extends JPanel implements ActionListener {

    private Label titre = new Label("Projet D.E.R.P.", 760, 25);
    private Label sous_titre = new Label("Connexion", 760, 25);
    private Label username = new Label("Nom d'utilisateur :", 160, 25);
    private Label password = new Label("Mot de passe :", 160, 25);
    private TextField login = new TextField();
    private JPasswordField pass = new JPasswordField();
    private JPanel title_panel = new JPanel();
    private JPanel subtitle_panel = new JPanel();
    private JPanel line1_panel = new JPanel();
    private JPanel line2_panel = new JPanel();
    private JPanel login_panel = new JPanel();
    private JPanel pass_panel = new JPanel();
    private JPanel button_panel = new JPanel();
    private Button connection = new Button("Connexion");
    private Button quit = new Button("Quitter");
    private SocketIO socket;

    public ConnectionPanel(SocketIO socket) {
	this.socket = socket;
    }

    public void build() {
	//These 2 lines has to be removed.
	pass.setText("admin");
	login.setText("admin");

	pass.setPreferredSize(new Dimension(250, 25));
	title_panel.add(titre);
	subtitle_panel.add(sous_titre);
	line1_panel.add(new Line(Short.MAX_VALUE, 1, Color.black));
	line2_panel.add(new Line(Short.MAX_VALUE, 1, Color.black));
	login_panel.add(username);
	login_panel.add(login);
	pass_panel.add(password);
	pass_panel.add(pass);
	button_panel.add(connection);
	button_panel.add(quit);
	GroupLayout layout = new GroupLayout(this);
	this.setLayout(layout);
	layout.setHorizontalGroup(layout.createParallelGroup().addComponent(title_panel).addComponent(line1_panel).addComponent(subtitle_panel).addComponent(line2_panel).addComponent(login_panel).addComponent(pass_panel).addComponent(button_panel));
	layout.setVerticalGroup(layout.createSequentialGroup().addComponent(title_panel).addComponent(line1_panel).addComponent(subtitle_panel).addComponent(line2_panel).addGap(150).addComponent(login_panel).addComponent(pass_panel).addGap(15).addComponent(button_panel).addGap(Short.MAX_VALUE));
	connection.addActionListener(this);
	quit.addActionListener(this);
	if (!"".equals(login.getText()) && (!String.valueOf(pass.getPassword()).equals(""))) {
	    connection.requestFocus();
	} else {
	    login.requestFocus();
	}
    }

    @Override
    public void actionPerformed(ActionEvent ae) {
	if (ae.getSource() == connection) {
	    if (!"".equals(login.getText()) && (!String.valueOf(pass.getPassword()).equals("")) && socket != null) {
		try {
		    JSONObject data = new JSONObject("{ev: '/users/', cmd: 'connection', login: " + login.getText() + ", pass: " + String.valueOf(pass.getPassword()) + "}");
		    socket.emit("message", data);
		} catch (JSONException ex) {
		    ex.printStackTrace(System.out);
		}
	    } else if ("".equals(login.getText()) || String.valueOf(pass.getPassword()).equals("")) {
		System.out.println("Login et/ou pass nuls");
	    } else if (socket == null) {
		System.out.println("Non connecté");
	    }
	} else if (ae.getSource() == quit) {
	    System.exit(0);
	}
    }
}
