/* This class is used to build buttons. It's inherited from JButton */

package derp;

import java.awt.event.KeyEvent;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.KeyStroke;

public class Button extends JButton {

    public Button(String nom) {
	super(nom);
	
	/* Thanks to this we can use space or enter key to fire buttons when focused. */
	this.registerKeyboardAction(this.getActionForKeyStroke(
		KeyStroke.getKeyStroke(KeyEvent.VK_SPACE, 0, false)),
		KeyStroke.getKeyStroke(KeyEvent.VK_ENTER, 0, false),
		JComponent.WHEN_FOCUSED);

	this.registerKeyboardAction(this.getActionForKeyStroke(
		KeyStroke.getKeyStroke(KeyEvent.VK_SPACE, 0, true)),
		KeyStroke.getKeyStroke(KeyEvent.VK_ENTER, 0, true),
		JComponent.WHEN_FOCUSED);
    }
}
