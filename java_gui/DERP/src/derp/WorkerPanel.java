package derp;

import io.socket.SocketIO;
import java.awt.Color;
import javax.swing.GroupLayout;
import javax.swing.JPanel;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import org.json.JSONException;

public class WorkerPanel extends JPanel {

    private JPanel list_panel = new JPanel();
    private JPanel details_panel = new JPanel();
    private JPanel button_panel = new JPanel();
    private ScrollPane list_scroll = new ScrollPane("Workers", 175, 390);
    private ScrollPane details_scroll = new ScrollPane("Détails", 580, 440);
    private Button add = new Button("+");
    private Button del = new Button("-");
    private List list;
    private MenuPanel menu_panel;
    private SocketIO socket;
    private Table details;
    private Worker worker;
    private Worker data[];
    private Frame frame;

    public WorkerPanel(Object[] data, SocketIO socket, Frame frame) throws JSONException {
	this.data = (Worker[]) data;
	this.socket = socket;
	this.frame = frame;
	build((Worker[]) data);
    }

    private void build(final Worker[] data) throws JSONException {
	this.setBackground(Color.white);

	if (data != null) {
	    list = Worker.drawList(data);
	    list.addListSelectionListener(new ListSelectionListener() {

		public void valueChanged(ListSelectionEvent event) {
		    try {
			worker = (Worker) list.getSelectedValue();
			details = worker.drawDetails();
			details.getSelectionModel().addListSelectionListener(new WorkerListener(details, socket));
			details_scroll.setContent(details);
		    } catch (JSONException ex) {
			ex.printStackTrace(System.out);
		    }
		}
	    });
	}

	add.setEnabled(false);
	del.setEnabled(false);
	list_scroll.setViewportView(list);
	list_panel.add(list_scroll);
	details_panel.add(details_scroll);
	button_panel.add(add);
	button_panel.add(del);
	menu_panel = new MenuPanel("Liste des workers", socket, frame);
	GroupLayout layout = new GroupLayout(this);
	this.setLayout(layout);
	layout.setHorizontalGroup(layout.createParallelGroup().addComponent(menu_panel).addGroup(layout.createSequentialGroup().addGroup(layout.createParallelGroup().addComponent(list_panel).addComponent(button_panel)).addComponent(details_panel)));

	layout.setVerticalGroup(layout.createSequentialGroup().addComponent(menu_panel).addGroup(layout.createParallelGroup().addGroup(layout.createSequentialGroup().addComponent(list_panel).addComponent(button_panel)).addComponent(details_panel)));
    }

    public int getSelectedId() {
	return worker.id;
    }
}
