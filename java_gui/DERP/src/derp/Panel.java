package derp;

import java.awt.Component;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import javax.swing.JPanel;

public class Panel extends JPanel {

    public Panel() {
    }

    public Panel(int largeur, int hauteur) {
        this.setPreferredSize(new Dimension(largeur, hauteur));
    }

    public void add(Component component, GridBagConstraints constraints, int x, int y, int largeur, int hauteur) {
        constraints.gridx = x;
        constraints.gridy = y;
        constraints.gridwidth = largeur;
        constraints.gridheight = hauteur;
        this.add(component, constraints);
    }
}
