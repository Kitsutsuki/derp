package derp;

import java.awt.Dimension;
import java.awt.Font;
import javax.swing.JLabel;
import javax.swing.SwingConstants;

public class Text extends JLabel {

    public Text() {
    }

    public Text(String contenu, int style, int taille, int largeur, int hauteur) {
	super(contenu, SwingConstants.LEFT);
	Font font = new Font("Ubuntu", style, taille);
	this.setFont(font);
	this.setPreferredSize(new Dimension(largeur, hauteur));
    }
}
