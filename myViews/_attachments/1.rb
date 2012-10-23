# encoding: UTF-8
require 'rubygems'
require 'couchrest'


#fd = IO.sysopen("/dev/usblp0", "w")
#a = IO.new(fd,"wb")

fd = IO.sysopen("/dev/usblp0", "w")
a = IO.new(fd,"wb")

server = CouchRest.new("http://localhost:5984") 


db = server.database('r61b') 


#hash = CouchRest.get("#r61b/_changes?feed=longpoll&since=#{n}&timeout=55")


puts db.view("myViews/diaSessao").inspect
n=CouchRest.get("localhost:5984/r61b/ ")["committed_update_seq"]

antS=0;
while(true)
  
  #if(n!=CouchRest.get("localhost:5984/r61/ ")["committed_update_seq"])
  
  lr= CouchRest.get("localhost:5984/r61b/_changes?since=#{n}&timeout=5000&feed=longpoll&filter=myViews/impressora")
  puts '**************'

#string.sub(/€/, '\xee')

  ll=lr["results"]
  las=lr["last_seq"]

puts las
puts n
  n=las
  ll.each {
    |t|

  puts '**...............'

    #puts t
#    if las != antS
      uu=db.get(t["id"]);
      ua=uu["texto"]
      ua.each {|r| 
        puts r+ "!!"
        r.gsub!("€", "\xee")
        a.puts r
      }
 a.flush
      puts uu["local"]
      # puts t["id"]
      # puts " last "+antS.to_s+"  "+ las.to_s
      # puts t["id"]
      antS=las 
#    end
    
  }
  #n=CouchRest.get("localhost:5984/r61/ ")["committed_update_seq"]
  
    
    
    
  #end
  
end
puts CouchRest.get("localhost:5984/r61b/ ")["committed_update_seq"]

	
