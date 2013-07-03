package derp;

import io.socket.SocketIO;
import java.awt.Color;
import java.awt.HeadlessException;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import javax.swing.GroupLayout;
import javax.swing.JList;
import javax.swing.JPanel;
import org.json.JSONException;

public class MenuPanel extends JPanel implements ActionListener {

    private Button jobs = new Button("Jobs");
    private Button workers = new Button("Workers");
    private Button groups = new Button("Groupes");
    private Button users = new Button("Utilisateurs");
    private Button logout = new Button("Deconnexion");
    private Label titre = new Label("Projet D.E.R.P.", 241, 25);
    private Label sous_titre;
    private JPanel main_menu_panel = new JPanel();
    private JPanel sub_menu_panel = new JPanel();
    private JPanel line1_panel = new JPanel();
    private JPanel line2_panel = new JPanel();
    private SocketIO socket;
    private Frame frame;
    private int width;
    private int height;

    public MenuPanel(String sous_titre, SocketIO socket, Frame frame) {
        this.socket = socket;
        this.frame = frame;
        this.width = frame.getWidth();
        this.height = frame.getHeight();
        build(sous_titre);
    }

    private void build(String sous_titre) {
        this.setBackground(Color.white);
        this.sous_titre = new Label(sous_titre, 760, 25);
        if (!Session.getStatus().equals("Admin")) {
            users.setEnabled(false);
        }
        System.out.println(width + " " + height);
        main_menu_panel.add(titre);
        main_menu_panel.add(jobs);
        main_menu_panel.add(workers);
        main_menu_panel.add(groups);
        main_menu_panel.add(users);
        main_menu_panel.add(logout);
        sub_menu_panel.add(this.sous_titre);
        line1_panel.add(new Line(Short.MAX_VALUE, 1, Color.black));
        line2_panel.add(new Line(Short.MAX_VALUE, 1, Color.black));

        jobs.addActionListener(this);
        workers.addActionListener(this);
        groups.addActionListener(this);
        users.addActionListener(this);
        logout.addActionListener(this);
        GroupLayout layout = new GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(layout.createParallelGroup().addComponent(main_menu_panel).addComponent(line1_panel).addComponent(sub_menu_panel).addComponent(line2_panel));
        layout.setVerticalGroup(layout.createSequentialGroup().addComponent(main_menu_panel).addComponent(line1_panel).addComponent(sub_menu_panel).addComponent(line2_panel));

        frame.addComponentListener(new ComponentAdapter() {

            public void componentResized(ComponentEvent e) {
                width = frame.getWidth();
                height = frame.getHeight();
                frame.validate();
            }
        });
    }

    @Override
    public void actionPerformed(ActionEvent ae) {
        try {
            if (ae.getSource() == jobs) {
                socket.emit("message", Job.getList());
            } else if (ae.getSource() == workers) {
                socket.emit("message", Worker.getList());
            } else if (ae.getSource() == groups) {
                socket.emit("message", Group.getList());
            } else if (ae.getSource() == users) {
                socket.emit("message", User.getList());
            } else if (ae.getSource() == logout) {
                Session.destroy();
                ConnectionPanel cpanel = new ConnectionPanel(socket);
                frame.setPanel(cpanel);
                cpanel.build();
            }
        } catch (JSONException | HeadlessException ex) {
            ex.printStackTrace(System.out);
        }
    }
}
