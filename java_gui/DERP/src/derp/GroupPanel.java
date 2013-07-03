package derp;

import io.socket.SocketIO;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.GroupLayout;
import javax.swing.JList;
import javax.swing.JPanel;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import org.json.JSONException;

public class GroupPanel extends JPanel implements ActionListener {

    private JPanel list_panel = new JPanel();
    private JPanel details_panel = new JPanel();
    private JPanel button_panel = new JPanel();
    private ScrollPane list_scroll = new ScrollPane("Groupes", 175, 390);
    private ScrollPane details_scroll = new ScrollPane("Détails", 580, 440);
    private Button add = new Button("+");
    private Button del = new Button("-");
    private JList list;
    private MenuPanel menu_panel;
    private SocketIO socket;
    private Table details;
    private Group group;
    private Group data[];
    private Frame frame;

    public GroupPanel(Object[] data, SocketIO socket, Frame frame) throws JSONException {
        this.data = (Group[]) data;
        this.socket = socket;
        this.frame = frame;
        build((Group[]) data);
    }

    private void build(final Group[] data) throws JSONException {

        if (data != null) {
            list = Group.drawList(data);
            list.addListSelectionListener(new ListSelectionListener() {

                public void valueChanged(ListSelectionEvent event) {
                    try {
                        group = (Group) list.getSelectedValue();
                        details = group.drawDetails();
                        details.getSelectionModel().addListSelectionListener(new GroupListener(details, socket));
                        details_scroll.setContent(details);
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
        menu_panel = new MenuPanel("Liste des groupes", socket, frame);
        GroupLayout layout = new GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(layout.createParallelGroup().addComponent(menu_panel).addGroup(layout.createSequentialGroup().addGroup(layout.createParallelGroup().addComponent(list_panel).addComponent(button_panel)).addComponent(details_panel)));

        layout.setVerticalGroup(layout.createSequentialGroup().addComponent(menu_panel).addGroup(layout.createParallelGroup().addGroup(layout.createSequentialGroup().addComponent(list_panel).addComponent(button_panel)).addComponent(details_panel)));
    }

    public int getSelectedId() {
        return group.id;
    }

    @Override
    public void actionPerformed(ActionEvent ae) {
        try {
            if (ae.getSource() == add) {
                socket.emit("message", Group.add());
            } else if (ae.getSource() == del) {
                socket.emit("message", Group.delete(this.getSelectedId()));
            }
        } catch (JSONException ex) {
            ex.printStackTrace(System.out);
        }
    }
}
