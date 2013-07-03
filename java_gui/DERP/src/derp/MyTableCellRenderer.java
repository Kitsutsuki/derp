/*
 * A custom table cell renderer. Not used yet.
 */
package derp;

import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import javax.swing.JCheckBox;
import javax.swing.JPanel;
import javax.swing.JTable;
import javax.swing.table.DefaultTableCellRenderer;

public class MyTableCellRenderer extends DefaultTableCellRenderer {

    public Component getTableCellRendererComponent(JTable table, Object value, boolean isSelected, boolean hasFocus, int row, int column) {
        Component cell = super.getTableCellRendererComponent(table, value, isSelected, hasFocus, row, column);
        JPanel panel = new JPanel();

        Color background = null;
        Color foreground = null;

        if (isSelected) {
            background = new Color(187, 207, 229);
            foreground = new Color(0, 207, 229);
        }

        setBackground(background);

        if (value instanceof Progress) {
            return (new Progress(10));
        } else if (value instanceof Boolean) {
            JCheckBox jcb = new JCheckBox("", (Boolean) value);
            panel.add(jcb);
            return (panel);
        } else {
            return this;
        }
    }
}