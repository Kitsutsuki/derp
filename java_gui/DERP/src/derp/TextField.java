package derp;

import java.awt.Dimension;
import javax.swing.JTextField;

public class TextField extends JTextField {
    
    public TextField() {
	this.setPreferredSize(new Dimension(250, 25));
    }
    
    public TextField(String value) {
	this.setText(value);
	this.setPreferredSize(new Dimension(250, 25));
    }    
}
