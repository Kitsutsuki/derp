package derp;

import java.awt.Color;
import java.awt.Dimension;
import javax.swing.BorderFactory;
import javax.swing.JButton;

public class Progress extends JButton {
    
    public Progress(int i) {
	build(i);
    }
    
    private void build(int i) {
	this.setBackground(new Color(187, 207, 229));
	this.setBorder(BorderFactory.createEmptyBorder());
	this.setPreferredSize(new Dimension(i, 25));
	this.setFocusable(false);
    }
}
