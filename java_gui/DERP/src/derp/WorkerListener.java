package derp;

import io.socket.SocketIO;
import javax.swing.JOptionPane;
import javax.swing.JTable;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import org.json.JSONException;

public class WorkerListener implements ListSelectionListener {

    private JTable table;
    private String value, conf = "";
    private SocketIO socket;
    private WorkerPanel panel;

    public WorkerListener(JTable table, SocketIO socket) {
	this.socket = socket;
	this.table = table;
    }

    @Override
    public void valueChanged(ListSelectionEvent lse) {
	panel = (WorkerPanel) table.getParent().getParent().getParent().getParent();
	try {
	    switch (table.getSelectedRow()) {
		case 1:
		    value = JOptionPane.showInputDialog(null, "Nom de groupe :", table.getValueAt(table.getSelectedRow(), 1));
		    if (value != null) {
			socket.emit("message", Worker.update(panel.getSelectedId(), value));
		    }
		    break;
	    }
	} catch (JSONException ex) {
	    ex.printStackTrace(System.out);
	}
    }
}
