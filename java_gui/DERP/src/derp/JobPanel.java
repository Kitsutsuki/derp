package derp;

import io.socket.SocketIO;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.GroupLayout;
import javax.swing.JPanel;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import org.json.JSONException;

public class JobPanel extends JPanel implements ActionListener {

    private JPanel list_panel = new JPanel();
    private JPanel details_panel = new JPanel();
    private JPanel button_panel = new JPanel();
    private ScrollPane list_scroll = new ScrollPane("Jobs", 175, 390);
    private ScrollPane details_scroll = new ScrollPane("Détails", 580, 440);
    private Button add = new Button("+");
    private Button del = new Button("-");
    private List list;
    private MenuPanel menu_panel;
    private SocketIO socket;
    private Table details;
    private Job job;
    private Job data[];
    private Frame frame;

    public JobPanel(Object[] data, SocketIO socket, Frame frame) throws JSONException {
        this.data = (Job[]) data;
        this.socket = socket;
        this.frame = frame;
        this.setPreferredSize(new Dimension(760, 480));
        build((Job[]) data);
    }

    private void build(final Job[] data) throws JSONException {

        if (data != null) {
            list = Job.drawList(data);
            list.addListSelectionListener(new ListSelectionListener() {

                public void valueChanged(ListSelectionEvent event) {
                    try {
                        job = (Job) list.getSelectedValue();
                        details = job.drawDetails();
                        details.getSelectionModel().addListSelectionListener(new JobListener(details, socket));
                        details_scroll.setContent(details);
                    } catch (JSONException ex) {
                        ex.printStackTrace(System.out);
                    }
                }
            });
        }

        list_scroll.setViewportView(list);
        list_panel.add(list_scroll);
        details_panel.add(details_scroll);
        button_panel.add(add);
        button_panel.add(del);
        add.addActionListener(this);
        del.addActionListener(this);
        menu_panel = new MenuPanel("Liste des jobs", socket, frame);
        GroupLayout layout = new GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(layout.createParallelGroup().addComponent(menu_panel).addGroup(layout.createSequentialGroup().addGroup(layout.createParallelGroup().addComponent(list_panel).addComponent(button_panel)).addComponent(details_panel)));

        layout.setVerticalGroup(layout.createSequentialGroup().addComponent(menu_panel).addGroup(layout.createParallelGroup().addGroup(layout.createSequentialGroup().addComponent(list_panel).addComponent(button_panel)).addComponent(details_panel)));
    }

    public int getSelectedId() {
        return job.id;
    }

    @Override
    public void actionPerformed(ActionEvent ae) {
        try {
            if (ae.getSource() == add) {
                socket.emit("message", Job.add());
            } else if (ae.getSource() == del) {
                socket.emit("message", Job.delete(this.getSelectedId()));
            }
        } catch (JSONException ex) {
            ex.printStackTrace(System.out);
        }
    }
}
