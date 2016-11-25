# ICECAST + ICES2 Local Server configuration

##### Edit Icecast2 configuration
Open the file /etc/icecast2/icecast.xml as root in an editor.
For security reasons you should setup passwords in the <authentication> section:

```
<admin-user>admin</admin-user>
<admin-password>hackme</admin-password> 
```

	You also need to define the hostname where your stream can be reached:

```
<hostname>barmaglot.com<</hostname>
```

	Add following line to config:
```
    <shoutcast-mount>/barmaglot</shoutcast-mount>
    <charset>UTF-8</charset>
```

 
##### Edit defaults

	Open the /etc/default/icecast2 file as root in an editor. The last line needs to be changed to

```
ENABLE=true
````

##### Start/Stop Icecast

	The server is started and stopped by the following commands:

```
/etc/init.d/icecast2 start
/etc/init.d/icecast2 stop
```


	Server admin is available on http://localhost:8000/admin/


##### Ices2 Install ices2 for streaming OGG Vorbis audio from a local soundcard

	Make directories for Ices2


```
mkdir /var/log/ices   # in case you need logfiles.  
mkdir /etc/ices2      # for putting ices stuff in.  
```

	Download odd files for local streaming

```
cd /etc/ices2/music/
sudo wget http://www.vorbis.com/music/Epoq-Lepidoptera.ogg
sudo wget http://www.vorbis.com/music/Hydrate-Kenny_Beltrey.ogg
sudo wget http://www.vorbis.com/music/Lumme-Badloop.ogg
sudo wget http://www.vorbis.com/music/Mists_of_Time-4T.ogg
```

	Add to playlist.txt

```
cd /etc/ices2
sudo vim playlist.txt
```

	Add the following lines:

```
/etc/ices2/music/Hydrate-Kenny_Beltrey.ogg
/etc/ices2/music/Lumme-Badloop.ogg
/etc/ices2/music/Mists_of_Time-4T.ogg
/etc/ices2/music/The_Abyss-4T.ogg

```

	Restart icecast2 server and run ices2 with configured config


```
/etc/init.d/icecast2 start
ices2 /etc/ices2/ices-playlist.xml
```

Streaming is availible by link http://localhost:8000/examp	le1.ogg
