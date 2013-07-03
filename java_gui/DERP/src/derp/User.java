package derp;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import org.json.JSONException;
import org.json.JSONObject;

public class User {

    int id;
    String login;
    String pass;
    String status;
    String jobs;
    JSONObject jo;
    Object keys[];
    private String entetes[] = {"Nom d'utilisateur : ", "Statut : ", "Jobs : "};
    private String headers[] = {"login", "status", "jobs"};

    public User(JSONObject jo) throws JSONException {
	this.jo = jo;
	this.id = jo.getInt("_id");
	this.login = jo.getString("login");
	this.pass = jo.getString("pass");
	this.status = jo.getString("status");
	this.jobs = jo.getString("jobs");
    }

    public Object getByKey(String key) throws JSONException {
	if (jo.get(key) instanceof String) {
	    return (String) jo.get(key);
	} else if (jo.get(key) instanceof Integer) {
	    return (Integer) jo.get(key);
	} else if (jo.get(key) instanceof Boolean) {
	    return (Boolean) jo.get(key);
	} else {
	    return jo.get(key);
	}
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

    public static User getUserByName(String name, User[] list) {
	User user = null;
	for (int i = 0; i < list.length; i++) {
	    if (list[i].login.equals(name)) {
		user = list[i];
		break;
	    }
	}
	return user;
    }

    public String[] getHeaders() {
	String string[] = {"Nom d'utilisateur : ", "Statut : ", "Jobs : "};
	return string;
    }

    public static List drawList(Object[] obj) throws JSONException {
	User list[] = (User[]) obj;
	ArrayList source = new ArrayList();
	source.addAll(Arrays.asList(list));
	return new List(source);
    }

    public Table drawDetails() throws JSONException {
	Object[][] data = {
	    {"Nom", this.login},
	    {"Status", this.status},
	    {"Mot de passe", this.pass},
	    {"Jobs", this.jobs},
	};
	TableModel tm = new TableModel(data);
	return new Table(tm);
    }

    public static JSONObject getList() throws JSONException {
	return new JSONObject("{ev: '/users/', cmd: GET, owner: admin}");
    }

    public JSONObject getDetails() throws JSONException {
	return new JSONObject("{ev: '/users/" + this.id + "', cmd: GET, owner: admin}");
    }

    public static JSONObject delete(int id) throws JSONException {
	return new JSONObject("{ev: '/users/', _id: " + id + ", cmd: DELETE, owner: admin}");
    }

    public static JSONObject add() throws JSONException {
	return new JSONObject("{ev: '/users/', cmd: POST, owner: admin, data: {login: 'Nouvel utilisateur', pass: 'none', status: 'Basique'}}");
    }

    public static JSONObject update(int id, String key, Object value) throws JSONException {
	return new JSONObject("{ev: '/users/', cmd: PUT, owner: admin, data: {_id: " + id + ", " + key + ": " + value + "}}");
    }

    public static JSONObject getHead() throws JSONException {
	return new JSONObject("{ev: '/users/', cmd: HEAD, owner: admin}");
    }

    public int length() {
	return getClass().getDeclaredFields().length - 6;
    }
}