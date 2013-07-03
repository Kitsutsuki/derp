package derp;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import org.json.JSONException;
import org.json.JSONObject;

public class Worker {

    int id;
    String host_name;
    String state;
    String group_name;
    String workload;
    String ip_address;
    int nb_of_core;
    int cpu_frequence;
    int ram;
    String os;
    int archi;
    String socket;
    JSONObject jo;
    Object keys[];
    private String entetes[] = {"Nom : ", "Groupe : ", "État : ", "Adresse IP : ", "Système d'exploitation : ", "Architecture : ", "Nombre de coeurs : ", "Fréquence du CPU : ", "RAM : ", "Workload en cours : ", "Socket : "};
    private String headers[] = {"hostName", "groupName", "state", "ipAddress", "os", "archi", "nbOfCore", "cpuFrequence", "RAM", "workload", "socket"};

    public Worker(JSONObject jo) throws JSONException {
	this.jo = jo;
	this.id = jo.getInt("_id");
	this.host_name = jo.getString("hostName");
	this.state = jo.getString("state");
	this.group_name = jo.getString("groupName");
	this.workload = jo.getString("workload");
	this.ip_address = jo.getString("ipAddress");
	this.nb_of_core = jo.getInt("nbOfCore");
	this.cpu_frequence = jo.getInt("cpuFrequence");
	this.ram = jo.getInt("RAM");
	this.os = jo.getString("os");
	this.archi = jo.getInt("archi");
	this.socket = jo.getString("socket");
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

    public static Worker getWorkerByName(String name, Worker[] list) {
	Worker worker = null;
	for (int i = 0; i < list.length; i++) {
	    if (list[i].host_name.equals(name)) {
		worker = list[i];
		break;
	    }
	}
	return worker;
    }

    public static List drawList(Object[] obj) throws JSONException {
	Worker list[] = (Worker[]) obj;
	ArrayList source = new ArrayList();
	source.addAll(Arrays.asList(list));
	return new List(source);
    }

    public Table drawDetails() throws JSONException {
	Object[][] data = {
	    {"Nom : ", this.host_name},
	    {"Groupe : ", this.group_name},
	    {"État : ", this.state},
	    {"Adresse IP : ", this.ip_address},
	    {"Système d'exploitation : ", this.os},
	    {"Architecture : ", this.archi},
	    {"Nombre de coeurs : ", this.nb_of_core},
	    {"Fréquence du CPU : ", this.cpu_frequence},
	    {"RAM : ", this.ram},
	    {"Workload en cours : ", this.workload},
	    {"Socket : ", this.socket}
	};
	TableModel tm = new TableModel(data);
	return new Table(tm);
    }

    public static JSONObject getList() throws JSONException {
	return new JSONObject("{ev: '/workers/', cmd: GET, owner: admin}");
    }

    public JSONObject getDetails() throws JSONException {
	return new JSONObject("{ev: '/workers/" + this.id + "', cmd: GET, owner: admin}");
    }

    public static JSONObject update(int id, String groupName) throws JSONException {
	return new JSONObject("{ev: '/workers/', cmd: PUT, owner: admin, data: {_id: " + id + ", groupName: " + groupName + "}}");
    }

    public static JSONObject getHead() throws JSONException {
	return new JSONObject("{ev: '/workers/', cmd: HEAD, owner: admin}");
    }

    public int length() {
	return getClass().getDeclaredFields().length - 5;
    }
}
