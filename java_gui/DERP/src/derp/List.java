package derp;

import java.util.ArrayList;
import javax.swing.JList;
import javax.swing.ListSelectionModel;


public class List extends JList {
    
    public List(ArrayList arraylist) {
	super(arraylist.toArray());
	this.setBackground(null);
	this.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
	this.setCellRenderer(new ListCellRenderer());
    }
}
