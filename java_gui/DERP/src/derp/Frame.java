package derp;

import io.socket.SocketIO;
import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.net.MalformedURLException;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class Frame extends JFrame {

    //address = "http://127.0.0.1:7776/"
    private Frame frame = this;

    public Frame() {
        build();
    }

    public Frame(String address) throws MalformedURLException {
        
        final SocketIO socket = new SocketIO(address);
        ConnectionPanel panel = new ConnectionPanel(socket);
        build();
        this.setContentPane(panel);
        panel.build();
        connection(socket);

        /*
         * Custom closing operation for the frames.
         * It disconnects from the server, destroy the session,
         * closes the frames and exit the program.
         */
        this.addWindowListener(new WindowAdapter() {

            public void windowClosing(WindowEvent e) {
                socket.emit("closed", (Object) null);
                Session.destroy();
                frame.dispose();
                System.exit(0);
            }
        });
    }

    public final void build() {
        this.setTitle("D.E.R.P.");
        this.setSize(800, 600);
        this.setLocationRelativeTo(null);
        //this.setResizable(false);
        this.setVisible(true);
        this.setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
        this.setIconImage(new ImageIcon(this.getClass().getResource("icon.png")).getImage());
    }

    private void connection(SocketIO socket) throws MalformedURLException {
        socket.connect(new Connection(socket, this));
    }

    public void setPanel(JPanel panel) {
        this.setContentPane(panel);
        this.revalidate();
    }
}