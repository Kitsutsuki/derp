package derp;

import javax.swing.table.AbstractTableModel;

public class TableModel extends AbstractTableModel {

    Object[][] data;
    String title[] = {"Champ", "Valeur"};

    public TableModel(Object[][] data) {
	this.data = data;
    }

    @Override
    public int getColumnCount() {
	return this.title.length;
    }

    @Override
    public int getRowCount() {
	return this.data.length;
    }

    @Override
    public Object getValueAt(int row, int col) {
	return this.data[row][col];
    }

    @Override
    public String getColumnName(int col) {
	return this.title[col];
    }

    @Override
    public Class getColumnClass(int col) {
	return getValueAt(0, col).getClass();
    }
    
    @Override
    public boolean isCellEditable(int row, int col) {
	return false;
    }
}