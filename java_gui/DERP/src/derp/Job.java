package derp;

import java.awt.Dimension;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import javax.swing.JButton;
import org.json.JSONException;
import org.json.JSONObject;

public class Job {

    int id;
    String path;
    String win_path;
    String lin_path;
    String mac_path;
    String owner;
    String name;
    int min_ram;
    int max_ram;
    int min_cpu_frequence;
    boolean files_created;
    String files_name_patterns;
    boolean is_using_gpu;
    int nb_run;
    int archi;
    String parameters_list;
    int priority;
    String status;
    Progress progress;
    String dir;
    String result_file;
    JSONObject jo;
    Object keys[];
    private String entetes[] = {"Nom : ", "Propriétaire : ", "Statut : ", "Avancement : ", "RAM minimum : ", "RAM maximum : ", "CPU minimum : ", "Création de fichiers : ", "FNP : ", "Utilisation de la carte graphique : ", "Architecture : ", "Priorité : ", "Nombre d'exécutions : ", "Liste des paramètres : ", "Exécutable Windows : ", "Exécutable Linux : ", "Exécutable Mac : ", "Chemin sur le serveur : ", "Répertoire : ", "Résultat : "};
    private String headers[] = {"name", "owner", "status", "progress", "minRam", "maxRam", "minCpuFrequence", "filesCreated", "filesNamePatterns", "isUsingCG", "archi", "priority", "nbRun", "parametersList", "winPath", "linPath", "macPath", "path", "dir", "resultFile"};

    public Job(JSONObject jo) throws JSONException {
	this.jo = jo;
	this.id = jo.getInt("_id");
	this.path = jo.getString("path");
	this.win_path = jo.getString("winPath");
	this.lin_path = jo.getString("linPath");
	this.mac_path = jo.getString("macPath");
	this.owner = jo.getString("owner");
	this.name = jo.getString("name");
	this.min_ram = jo.getInt("minRam");
	this.max_ram = jo.getInt("maxRam");
	this.min_cpu_frequence = jo.getInt("minCpuFrequence");
	this.files_created = jo.getBoolean("filesCreated");
	this.files_name_patterns = jo.getString("filesNamePatterns");
	this.is_using_gpu = jo.getBoolean("isUsingCG");
	this.nb_run = jo.getInt("nbRun");
	this.archi = jo.getInt("archi");
	this.parameters_list = jo.getString("parametersList");
	this.progress = new Progress(jo.getInt("progress"));
	this.dir = jo.getString("dir");
	this.result_file = jo.getString("resultFile");
    }

    public Object getByKey(String key) throws JSONException {
	return jo.get(key);
    }

    public Object getByIndex(int index) throws JSONException {
	keys = this.getKeys();
	return jo.get((String) keys[index]);
    }

    public Object[] getKeys() throws JSONException {
	keys = new Object[jo.length()];
	Iterator it = jo.keys();
	int i = 0;
	while (it.hasNext()) {
	    keys[i] = it.next();
	    i++;
	}
	return keys;
    }

    public JSONObject getJSONObject() {
	return jo;
    }

    public static Job getJobByName(String name, Job[] list) {
	Job job = null;
	for (int i = 0; i < list.length; i++) {
	    if (list[i].name.equals(name)) {
		job = list[i];
		break;
	    }
	}
	return job;
    }

    public static List drawList(Object[] obj) throws JSONException {
	Job list[] = (Job[]) obj;
	ArrayList source = new ArrayList();
	source.addAll(Arrays.asList(list));
	return new List(source);
    }

    public Table drawDetails() throws JSONException {
	Object[][] data = {
	    {"ID : ", new Integer(this.id)},
	    {"Nom : ", this.name},
	    {"Propriétaire : ", this.owner},
	    {"Statut : ", this.status},
	    {"Avancement : ", this.progress},
	    {"RAM : ", "de " + this.min_ram + " à " + this.max_ram + " Mo"},
	    {"CPU minimum : ", this.min_cpu_frequence + " GHz"},
	    {"Création de fichiers : ", new Boolean(this.files_created)},
	    {"FNP : ", this.files_name_patterns},
	    {"Utilisation de la carte graphique : ", new Boolean(this.is_using_gpu)},
	    {"Architecture : ", new Integer(this.archi)},
	    {"Priorité : ", new Integer(this.priority)},
	    {"Nombre d'exécutions : ", new Integer(this.nb_run)},
	    {"Liste des paramètres : ", this.parameters_list},
	    {"Exécutable Windows : ", this.win_path},
	    {"Exécutable Linux : ", this.lin_path},
	    {"Exécutable Mac : ", this.mac_path},
	    {"Chemin sur le serveur : ", this.path},
	    {"Répertoire : ", this.dir},
	    {"Résultat : ", this.result_file}
	};
	TableModel tm = new TableModel(data);
	return new Table(tm);
    }

    public static JSONObject getList() throws JSONException {
	return new JSONObject("{ev: '/jobs/', cmd: GET, owner: admin}");
    }

    public JSONObject getDetails() throws JSONException {
	return new JSONObject("{ev: '/jobs/', _id: " + this.id + ", cmd: GET, owner: admin}");
    }

    public static JSONObject delete(int id) throws JSONException {
	return new JSONObject("{ev: '/jobs/', _id: " + id + ", cmd: DELETE, owner: admin}");
    }

    public static JSONObject modify(int id) throws JSONException {
	return new JSONObject("{ev: '/jobs/, _id: " + id + ", cmd: PUT, owner: admin}");
    }

    public static JSONObject add() throws JSONException {
	System.out.println(Session.getLogin());
	return new JSONObject("{ev: '/jobs/', cmd: POST, owner: " + Session.getLogin() + ", data: {path: '', winPath: '', linPath: '', macPath: '', owner: " + Session.getLogin() + ", name: 'Nouveau job', minRam: 0, maxRam: 0,  minCpuFrequence: 0, filesCreated: false, filesNamePatterns: '', isUsingCG: false, nbRun: 0, archi: 32, parametersList: '', priority: 0, status: 'pending', progress: 0, dir: '', resultFile: ''}}");
    }

    public static JSONObject update(int id, String key, Object value) throws JSONException {
	return new JSONObject("{ev: '/jobs/', cmd: PUT, owner: admin, data: {_id: " + id + ", " + key + ": " + value + "}}");
    }

    public static JSONObject getHead() throws JSONException {
	return new JSONObject("{ev: '/jobs/', cmd: HEAD, owner: admin}");
    }

    public int length() {
	return getClass().getDeclaredFields().length - 5;
    }
}
