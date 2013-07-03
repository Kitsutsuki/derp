package derp;

import io.socket.SocketIO;
import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.GroupLayout;
import javax.swing.JPanel;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import org.json.JSONException;

public class UserPanel extends JPanel implements ActionListener {

    private JPanel list_panel = new JPanel();
    private JPanel details_panel = new JPanel();
    private JPanel button_panel = new JPanel();
    private ScrollPane list_scroll = new ScrollPane("Utilisateur", 175, 390);
    private ScrollPane details_scroll = new ScrollPane("Détails", 580, 440);
    private Button add = new Button("+");
    private Button del = new Button("-");
    private List list;
    private MenuPanel menu_panel;
    private SocketIO socket;
    private Table details;
    private User user;
    private User data[];
    private Frame frame;

    public UserPanel(Object[] data, SocketIO socket, Frame frame) throws JSONException {
	this.data = (User[]) data;
	this.socket = socket;
	this.frame = frame;
	build((User[]) data);
    }

    private void build(final User[] data) throws JSONException {
	this.setBackground(Color.white);
	if (data != null) {
	    list = User.drawList(data);
	    list.addListSelectionListener(new ListSelectionListener() {

		public void valueChanged(ListSelectionEvent event) {
		    try {
			user = (User) list.getSelectedValue();
			details = user.drawDetails();
			details.getSelectionModel().addListSelectionListener(new UserListener(details, socket));
			details_scroll.setContent(details);
			/* We can't delete the user n°0 (the original admin). */
			if (getSelectedId() == 0) {
			    del.setEnabled(false);
			}
			else {
			    del.setEnabled(true);
			}
		    } catch (JSONException ex) {
			ex.printStackTrace(System.out);
		    }
		}
	    });
	}

	if (!Session.getStatus().equals("Admin")) {
	    add.setEnabled(false);
	    del.setEnabled(false);
	}
	list_scroll.setViewportView(list);
	list_panel.add(list_scroll);
	details_panel.add(details_scroll);
	button_panel.add(add);
	button_panel.add(del);
	add.addActionListener(this);
	del.addActionListener(this);
	menu_panel = new MenuPanel("Liste des utilisateurs", socket, frame);
	GroupLayout layout = new GroupLayout(this);
	this.setLayout(layout);
	layout.setHorizontalGroup(layout.createParallelGroup().addComponent(menu_panel).addGroup(layout.createSequentialGroup().addGroup(layout.createParallelGroup().addComponent(list_panel).addComponent(button_panel)).addComponent(details_panel)));
	layout.setVerticalGroup(layout.createSequentialGroup().addComponent(menu_panel).addGroup(layout.createParallelGroup().addGroup(layout.createSequentialGroup().addComponent(list_panel).addComponent(button_panel)).addComponent(details_panel)));
    }

    public int getSelectedId() {
	return user.id;
    }

    @Override
    public void actionPerformed(ActionEvent ae) {
	try {
	    if (ae.getSource() == add) {
		socket.emit("message", User.add());
	    } else if (ae.getSource() == del) {
                socket.emit("message", User.delete(this.getSelectedId()));
	    }
	} catch (JSONException ex) {
	    ex.printStackTrace(System.out);
	}
    }
}
