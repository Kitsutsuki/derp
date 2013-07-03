package derp;

import java.awt.Color;
import java.awt.Component;
import javax.swing.DefaultListCellRenderer;
import javax.swing.JList;

public class ListCellRenderer extends DefaultListCellRenderer {

    public Component getListCellRendererComponent(JList<?> list, Object value, int index, boolean isSelected, boolean cellHasFocus) {
        String[] val = value.toString().split("@");
        switch (val[0]) {
            case "derp.Job":
                setText(((Job)value).name);
                break;
            case "derp.User":
                setText(((User)value).login);
                break;
            case "derp.Worker":
                setText(((Worker)value).host_name);
                break;
            case "derp.Group":
                setText(((Group)value).name);
                break;
        }
	

	Color background = null;
	Color foreground = Color.BLACK;

	JList.DropLocation dropLocation = list.getDropLocation();
	if (dropLocation != null
		&& !dropLocation.isInsert()
		&& dropLocation.getIndex() == index) {
	} else if (isSelected) {
	    background = new Color(187, 207, 229);
	} else {
        }

	setBackground(background);
	setForeground(foreground);

	return this;
    }
}
