package derp;

import java.awt.Color;
import java.awt.Dimension;
import javax.swing.JPanel;

public class Line extends JPanel {

    public Line(int largeur, int hauteur, Color couleur) {
	this.setBackground(couleur);
	this.setPreferredSize(new Dimension(largeur, hauteur));
    }
}
