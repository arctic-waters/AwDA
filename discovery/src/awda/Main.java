package awda;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Base64;

public class Main {

    public static void main(String[] arg) throws InterruptedException {
        try {
            FileWriter writer = new FileWriter("export.dat", true);
            Thread.sleep(1000);
            System.out.println("Found: Alexa");
            Thread.sleep(500);
            System.out.println("Found: Sublime Text");
            Thread.sleep(2000);
            System.out.println("Found: Tunnel Bear");
            Thread.sleep(1000);
            System.out.println("Found: Google Nest");
            Thread.sleep(500);
            writer.write(Base64.getEncoder().encodeToString("asdfuy b9483758basdfasdfasdfasdfasdfasdfasdfsadfsadfsdfviuy awsbuf vb7web 7y8954327 79b854w 79bt4b27936v5t976 b4978647986 v78a96w6789p5 tra67p9 8w4v7695t34679 p5796 pvb34 76567 v9a3976 45asdfuy b9483758basdfasdfasdfasdfasdfasdfasdfsadfsadfsdfviuy awsbuf vb7web 7y8954327 79b854w 79bt4b27936v5t976 b4978647986 v78a96w6789p5 tra67p9 8w4v7695t34679 p5796 pvb34 76567 v9a3976 45asdfuy b9483758basdfasdfasdfasdfasdfasdfasdfsadfsadfsdfviuy awsbuf vb7web 7y8954327 79b854w 79bt4b27936v5t976 b4978647986 v78a96w6789p5 tra67p9 8w4v7695t34679 p5796 pvb34 76567 v9a3976 45asdfuy b9483758basdfasdfasdfasdfasdfasdfasdfsadfsadfsdfviuy awsbuf vb7web 7y8954327 79b854w 79bt4b27936v5t976 b4978647986 v78a96w6789p5 tra67p9 8w4v7695t34679 p5796 pvb34 76567 v9a3976 45asdfuy b9483758basdfasdfasdfasdfasdfasdfasdfsadfsadfsdfviuy awsbuf vb7web 7y8954327 79b854w 79bt4b27936v5t976 b4978647986 v78a96w6789p5 tra67p9 8w4v7695t34679 p5796 pvb34 76567 v9a3976 45asdfuy b9483758basdfasdfasdfasdfasdfasdfasdfsadfsadfsdfviuy awsbuf vb7web 7y8954327 79b854w 79bt4b27936v5t976 b4978647986 v78a96w6789p5 tra67p9 8w4v7695t34679 p5796 pvb34 76567 v9a3976 45asdfuy b9483758basdfasdfasdfasdfasdfasdfasdfsadfsadfsdfviuy awsbuf vb7web 7y8954327 79b854w 79bt4b27936v5t976 b4978647986 v78a96w6789p5 tra67p9 8w4v7695t34679 p5796 pvb34 76567 v9a3976 45asdfuy b9483758basdfasdfasdfasdfasdfasdfasdfsadfsadfsdfviuy awsbuf vb7web 7y8954327 79b854w 79bt4b27936v5t976 b4978647986 v78a96w6789p5 tra67p9 8w4v7695t34679 p5796 pvb34 76567 v9a3976 45asdfuy b9483758basdfasdfasdfasdfasdfasdfasdfsadfsadfsdfviuy awsbuf vb7web 7y8954327 79b854w 79bt4b27936v5t976 b4978647986 v78a96w6789p5 tra67p9 8w4v7695t34679 p5796 pvb34 76567 v9a3976 45967va34 69bw75 967va4w 9675 97va4 9765v 976aw4 9675v 967w4 b9657v a6w4 9p675v 9b67w49 567avw 946bp75 b6a79w4 b697v b967423 9b675q79 23796q237  35967 t2378t 5237 57v7y37y5v79y45tv473yt57yt6w3y874tyb8436yb3y6by43y634y6ywy364yby346y346yby36yb3y46yb3y46yb34y6b34y6by34y6wbyrygbwybyewtyweyrbtywerytbwyerytbweyrtyewrytbwyertbywerytbywertbyweyrtbsadfsadfsadfasdfasdfasdfasdfasdfasdfasdfash48965698 9687".getBytes()));
            writer.close();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Device information was saved to file: \"export.dat\"");
        Thread.sleep(2000);
    }
}
