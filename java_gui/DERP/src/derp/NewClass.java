package derp;


import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;

public class NewClass {

    public static void main(String[] args) {
        Panel panel = new Panel();
        /* On ajoute un gridbagLauout au panel */
        panel.setLayout(new GridBagLayout());
        /* Le gridBagConstraints va définir la position et la taille des éléments */
        GridBagConstraints gc = new GridBagConstraints();
        /*
         * le parametre fill sert à définir comment le composant sera rempli
         * GridBagConstraints.BOTH permet d'occuper tout l'espace disponible horizontalement et verticalement
         * GridBagConstraints.HORIZONTAL maximise horizontalement
         * GridBagConstraints.VERTICAL maximise verticalement
         */
        gc.fill = GridBagConstraints.BOTH;
        /*
         * insets définir la marge entre les composant
         * new Insets(margeSupérieure, margeGauche, margeInférieur, margeDroite)
         */
        gc.insets = new Insets(5, 5, 5, 5);
        /*
         * ipady permet de savoir où on place le composant s'il n'occupe pas la totalité
         * de l'espace disponnible
         */
        //gc.ipady = gc.anchor = GridBagConstraints.CENTER;;
        /* weightx définit le nombre de cases en abscisse */
        gc.weightx = 7;
        /* weightx définit le nombre de cases en ordonnée */
        gc.weighty = 8;
        /*
         * pour dire qu'on ajoute un composant en position (i, j), on définit
         * gridx=i et gridy=j
         */
        panel.add(new JLabel("title"), gc, 0, 0, 2, 1);
        panel.add(new JButton("button 1"), gc, 2, 0, 1, 1);
        panel.add(new JButton("button 2"), gc, 3, 0, 1, 1);
        panel.add(new JButton("button 3"), gc, 4, 0, 1, 1);
        panel.add(new JButton("button 4"), gc, 5, 0, 1, 1);
        panel.add(new JButton("button 5"), gc, 6, 0, 1, 1);
        panel.add(new JLabel("subtitle"), gc, 0, 1, 7, 1);   
        panel.add(new JButton("list"), gc, 0, 2, 2, 4);  
        panel.add(new JButton("button"), gc, 0, 6, 1, 1);    
        panel.add(new JButton("button"), gc, 1, 6, 1, 1);
        panel.add(new JButton("table"), gc, 2, 2, 5, 5);
        
        /* Définition de la fenêtre */
        JFrame f = new JFrame();
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        f.add(panel);
        f.setSize(500, 300);
        f.setLocationRelativeTo(null);
        f.setVisible(true);
    }

}
