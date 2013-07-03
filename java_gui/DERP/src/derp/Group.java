/*
 * The object GROUP
 */

package derp;

import java.util.ArrayList;
import java.util.Arrays;
import org.json.JSONException;
import org.json.JSONObject;

public class Group {

    int id;
    String name;
    int nb_win;
    int nb_lin;
    int nb_mac;
    int start_year;
    int start_month;
    int start_day;
    int start_hour;
    int start_minute;
    int end_year;
    int end_month;
    int end_day;
    int end_hour;
    int end_minute;
    JSONObject jo;
    Object keys[];

    public Group(JSONObject jo) throws JSONException {
	this.jo = jo;
	this.id = jo.getInt("_id");
	this.name = jo.getString("name");
	this.nb_win = jo.getInt("numberWin");
	this.nb_lin = jo.getInt("numberLin");
	this.nb_mac = jo.getInt("numberMac");
	this.start_year = jo.getInt("st_year");
	this.start_month = jo.getInt("st_month");
	this.start_day = jo.getInt("st_day");
	this.start_hour = jo.getInt("st_hour");
	this.start_minute = jo.getInt("st_min");
	this.end_year = jo.getInt("end_year");
	this.end_month = jo.getInt("end_month");
	this.end_day = jo.getInt("end_day");
	this.end_hour = jo.getInt("end_hour");
	this.end_minute = jo.getInt("end_min");
    }

    public static Group getGroupByName(String name, Group[] list) {
	Group group = null;
	for (int i = 0; i < list.length; i++) {
	    if (list[i].name.equals(name)) {
		group = list[i];
		break;
	    }
	}
	return group;
    }

    public static List drawList(Object[] obj) throws JSONException {
	Group list[] = (Group[]) obj;
	ArrayList source = new ArrayList();
	source.addAll(Arrays.asList(list));
	return new List(source);
    }

    public Table drawDetails() throws JSONException {
	Object[][] data = {
	    {"Nom : ", this.name},
	    {"Nombre de machines", new Integer(this.nb_lin + this.nb_mac + this.nb_win)},
	    {"Nombre de Windows : ", new Integer(this.nb_win)},
	    {"Nombre de Linux : ", new Integer(this.nb_lin)},
	    {"Nombre de Mac : ", new Integer(this.nb_mac)},
	    {"Heure de début : ", new Integer(this.start_hour)},
	    {"Minute de début : ", new Integer(this.start_minute)},
	    {"Heure de fin : ", new Integer(this.end_hour)},
	    {"Minute de fin : ", new Integer(this.end_minute)}
	};
	TableModel tm = new TableModel(data);
	return new Table(tm);
    }

    public static JSONObject getList() throws JSONException {
	return new JSONObject("{ev: '/groups/', cmd: GET, owner: admin, display: true}");
    }

    public static JSONObject delete(int id) throws JSONException {
	return new JSONObject("{ev: '/groups/', _id: " + id + ", cmd: DELETE, owner: admin}");
    }

    public static JSONObject modify(int id) throws JSONException {
	return new JSONObject("{ev: '/groups/', _id: " + id + ", cmd: PUT, owner: admin}");
    }

    public static JSONObject add() throws JSONException {
	return new JSONObject("{ev: '/groups/', cmd: POST, owner: admin, data: {name: 'Nouveau groupe', numberWin: 0, numberLin: 0, numberMac: 0, st_year: 0, st_month: 0, st_day: 0, st_hour: 0, st_min: 0, end_year: 0, end_month: 0, end_day: 0, end_hour: 0,end_min: 0}}");
    }

    public static JSONObject update(int id, String key, Object value) throws JSONException {
	return new JSONObject("{ev: '/groups/', cmd: PUT, owner: admin, data: {_id: " + id + ", " + key + ": " + value + "}}");
    }
}