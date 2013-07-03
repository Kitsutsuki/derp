package derp;

import java.awt.Dimension;
import javax.swing.JLabel;
import javax.swing.SwingConstants;

public class Label extends JLabel {

    public Label() {
    }

    public Label(String contenu, int largeur, int hauteur) {
	super(contenu, SwingConstants.LEFT);
        this.setAlignmentX(LEFT);
	//this.setPreferredSize(new Dimension(largeur, hauteur));
    }
}
