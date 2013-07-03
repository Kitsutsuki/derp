package derp;

import io.socket.SocketIO;
import javax.swing.JOptionPane;
import javax.swing.JTable;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import org.json.JSONException;

public class GroupListener implements ListSelectionListener {

    private JTable table;
    private String value, conf = "";
    private SocketIO socket;
    private GroupPanel panel;

    public GroupListener(JTable table, SocketIO socket) {
	this.socket = socket;
	this.table = table;
    }

    @Override
    public void valueChanged(ListSelectionEvent lse) {
	panel = (GroupPanel) table.getParent().getParent().getParent().getParent();
	try {
	    switch (table.getSelectedRow()) {
		case 0:
		    value = JOptionPane.showInputDialog(null, "Nom du groupe :", table.getValueAt(table.getSelectedRow(), 1));
		    if (value != null) {
			socket.emit("message", Group.update(panel.getSelectedId(), "name", value));
		    }
		    break;
		case 1:
		    Object val[] = {"Admin", "Basique"};
		    value = (String) JOptionPane.showInputDialog(null, "Statut :", null, JOptionPane.QUESTION_MESSAGE, null, val, table.getValueAt(table.getSelectedRow(), 1));
		    if (value != null) {
			socket.emit("message", Group.update(panel.getSelectedId(), "status", value));
		    }
		    break;
		case 2:
		    value = JOptionPane.showInputDialog(null, "Mot de passe :", table.getValueAt(table.getSelectedRow(), 1));
		    if (value != null && !value.equals("") && value.length() >= 5) {
			conf = JOptionPane.showInputDialog(null, "Confirmer le mot de passe :", table.getValueAt(table.getSelectedRow(), 1));
			if (value.equals(conf)) {
			    socket.emit("message", Group.update(panel.getSelectedId(), "pass", value));
			} else {
			    JOptionPane.showMessageDialog(null, "Les deux mots de passe saisis sont différents.", null, JOptionPane.WARNING_MESSAGE, null);
			}
		    } else if (value.length() < 5) {
			JOptionPane.showMessageDialog(null, "Le mot de passe doit faire plus de 5 lettres.", null, JOptionPane.WARNING_MESSAGE, null);
		    }
		    break;
	    }
	} catch (JSONException ex) {
	    ex.printStackTrace(System.out);
	}
    }
}
