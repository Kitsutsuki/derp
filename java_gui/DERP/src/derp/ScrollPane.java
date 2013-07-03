package derp;

import java.awt.Component;
import java.awt.Dimension;
import javax.swing.BorderFactory;
import javax.swing.JScrollPane;
import javax.swing.JTable;

public class ScrollPane extends JScrollPane {
    
    public ScrollPane(Component composant) {
	super(composant);
    }

    public ScrollPane(String title, int largeur, int hauteur) {
	this.setPreferredSize(new Dimension(largeur, hauteur));
	this.setBorder(BorderFactory.createTitledBorder(title));
    }

    public void setContent(List list) {
	this.setViewportView(list);
	this.getParent().validate();
    }

    public void setContent(Table table) {
	this.setViewportView(table);
	this.getParent().validate();
    }

    public void setContent(JTable table) {
	this.setViewportView(table);
	this.getParent().validate();
    }
}
