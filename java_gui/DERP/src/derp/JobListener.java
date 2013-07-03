package derp;

import io.socket.SocketIO;
import javax.swing.JOptionPane;
import javax.swing.JTable;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import org.json.JSONException;

public class JobListener implements ListSelectionListener {

    private JTable table;
    private String value1, value2 = "";
    private SocketIO socket;
    private JobPanel panel;
    private Object initial_value;

    public JobListener(JTable table, SocketIO socket) {
        this.socket = socket;
        this.table = table;
    }

    @Override
    public void valueChanged(ListSelectionEvent lse) {
        panel = (JobPanel) table.getParent().getParent().getParent().getParent();
        initial_value = table.getValueAt(table.getSelectedRow(), 1);
        Object val[] = {true, false};
        try {
            switch (table.getSelectedRow()) {
                case 0:
                    value1 = JOptionPane.showInputDialog(null, "Nom d'utilisateur :", initial_value);
                    if (value1 != null) {
                        socket.emit("message", Job.update(panel.getSelectedId(), "name", value1));
                    }
                    break;
                case 4:
                    value1 = JOptionPane.showInputDialog(null, "RAM minimum :", initial_value);
                    value2 = JOptionPane.showInputDialog(null, "RAM maximum :", initial_value);
                    if (value1 != null && value2 != null) {
                        socket.emit("message", Job.update(panel.getSelectedId(), "minRam", Integer.parseInt(value1)));
                        socket.emit("message", Job.update(panel.getSelectedId(), "maxRam", Integer.parseInt(value2)));
                    }
                    break;
                case 5:
                    value1 = JOptionPane.showInputDialog(null, "CPU minimum :", initial_value);
                    if (value1 != null) {
                        socket.emit("message", Job.update(panel.getSelectedId(), "minCpuFrequence", Integer.parseInt(value1)));
                    }
                    break;
                case 6:
                    value1 = String.valueOf(JOptionPane.showInputDialog(null, "Création de fichiers :", null, JOptionPane.QUESTION_MESSAGE, null, val, initial_value));
                    if (value1 != null) {
                        socket.emit("message", Job.update(panel.getSelectedId(), "filesCreated", value1));
                    }
                    break;
                case 7:
                    value1 = JOptionPane.showInputDialog(null, "FNP :", initial_value);
                    if (value1 != null) {
                        socket.emit("message", Job.update(panel.getSelectedId(), "filesNamePatterns", value1));
                    }
                    break;
                case 8:
                    value1 = (String) JOptionPane.showInputDialog(null, "Utilisation de la carte graphique :", null, JOptionPane.QUESTION_MESSAGE, null, val, initial_value);
                    if (value1 != null) {
                        socket.emit("message", Job.update(panel.getSelectedId(), "isUsingCG", value1));
                    }
                    break;
                case 9:
                    value1 = JOptionPane.showInputDialog(null, "RAM minimum :", initial_value);
                    value2 = JOptionPane.showInputDialog(null, "RAM maximum :", initial_value);
                    if (value1 != null) {
                        socket.emit("message", Job.update(panel.getSelectedId(), "minRam", Integer.parseInt(value1)));
                        socket.emit("message", Job.update(panel.getSelectedId(), "maxRam", Integer.parseInt(value2)));
                    }
                    break;
                case 10:
                    value1 = JOptionPane.showInputDialog(null, "RAM minimum :", initial_value);
                    value2 = JOptionPane.showInputDialog(null, "RAM maximum :", initial_value);
                    if (value1 != null) {
                        socket.emit("message", Job.update(panel.getSelectedId(), "minRam", Integer.parseInt(value1)));
                        socket.emit("message", Job.update(panel.getSelectedId(), "maxRam", Integer.parseInt(value2)));
                    }
                    break;
                case 11:
                    value1 = JOptionPane.showInputDialog(null, "RAM minimum :", initial_value);
                    value2 = JOptionPane.showInputDialog(null, "RAM maximum :", initial_value);
                    if (value1 != null) {
                        socket.emit("message", Job.update(panel.getSelectedId(), "minRam", Integer.parseInt(value1)));
                        socket.emit("message", Job.update(panel.getSelectedId(), "maxRam", Integer.parseInt(value2)));
                    }
                    break;
                case 12:
                    value1 = JOptionPane.showInputDialog(null, "RAM minimum :", initial_value);
                    value2 = JOptionPane.showInputDialog(null, "RAM maximum :", initial_value);
                    if (value1 != null) {
                        socket.emit("message", Job.update(panel.getSelectedId(), "minRam", Integer.parseInt(value1)));
                        socket.emit("message", Job.update(panel.getSelectedId(), "maxRam", Integer.parseInt(value2)));
                    }
                    break;
                case 13:
                    value1 = JOptionPane.showInputDialog(null, "RAM minimum :", initial_value);
                    value2 = JOptionPane.showInputDialog(null, "RAM maximum :", initial_value);
                    if (value1 != null) {
                        socket.emit("message", Job.update(panel.getSelectedId(), "minRam", Integer.parseInt(value1)));
                        socket.emit("message", Job.update(panel.getSelectedId(), "maxRam", Integer.parseInt(value2)));
                    }
                    break;
                case 14:
                    value1 = JOptionPane.showInputDialog(null, "RAM minimum :", initial_value);
                    value2 = JOptionPane.showInputDialog(null, "RAM maximum :", initial_value);
                    if (value1 != null) {
                        socket.emit("message", Job.update(panel.getSelectedId(), "minRam", Integer.parseInt(value1)));
                        socket.emit("message", Job.update(panel.getSelectedId(), "maxRam", Integer.parseInt(value2)));
                    }
                    break;
            }
        } catch (JSONException ex) {
            ex.printStackTrace(System.out);
        }
    }
}
