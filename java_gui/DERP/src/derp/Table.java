package derp;

import javax.swing.JTable;
import javax.swing.table.AbstractTableModel;
import javax.swing.table.TableCellRenderer;

public class Table extends JTable {

    public Table() {
        super();
    }

    public Table(AbstractTableModel model) {
        super(model);
        this.setAutoResizeMode(JTable.AUTO_RESIZE_OFF);
        this.setFocusable(false);
        this.setRowSelectionAllowed(false);
        this.setRowHeight(30);
        this.getColumnModel().getColumn(0).setPreferredWidth(185);
        this.getColumnModel().getColumn(1).setPreferredWidth(365);
        for (int i = 0; i < this.getColumnCount(); i++) {
            this.setDefaultRenderer(this.getColumnClass(i), new MyTableCellRenderer());
        }
    }

    /*@Override
    public TableCellRenderer getCellRenderer(int row, int column) {
        int modelColumn = convertColumnIndexToModel(column);
        TableCellRenderer rendered = super.getCellRenderer(row, column);
        if (modelColumn == 1) {

            Class rowClass = null;
            if (getModel().getValueAt(row, modelColumn) != null) {
                rowClass = getModel().getValueAt(row, modelColumn).getClass();
                if(rowClass.toString().equals("class derp.Progress")) {
                    rendered = new MyTableCellRenderer();
                }
                rendered = getDefaultRenderer(rowClass);
            }
        }

        return rendered;
    }*/
}
