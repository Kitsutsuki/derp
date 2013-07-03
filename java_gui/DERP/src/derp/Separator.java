package derp;

import java.awt.Color;
import javax.swing.JSeparator;

public class Separator extends JSeparator {
    
    public Separator() {
	this.setOpaque(false);
	this.setForeground(Color.red);
    }
    
    public Separator(int orientation) {
	super(orientation);
	this.setBackground(null);
    }
    
}
