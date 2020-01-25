function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

$(".output-log").append("==========================================================<br>")
$(".output-log").append("Currently loading the LCC Robotics website. Please wait...<br>")
$(".output-log").append("==========================================================<br>")

var text = ["sdO: Device Block Size: 2048 bytes",
            "sdO: Device Capacity: 600 MB",
            "sdO: Disk Label: RhapsodyDR2",
            "Registering: sg0 at 8021",
            "Registering: sg1 at sc0", 
            "Registering: sg2 at sc0",
            "Registering: sg3 at sc0",
            "Registering: event@",
            "Registering: kmDevice0 rootdev 300, howto 40000",
            "WARNING: preposterous time in Real Time Clock -- CHECK AND RESET THE DATE!",
            "Power management is enabled.",
            "May 7 16:41:01 init: unrecognized flag '-?'",
            "Thu May 7 16:41:03 PDT 1998",
            "Checking disk",
            "fsck: warning: /var/run/dev.db: No such file or directory",
            "/dev/rhd0a: FILESYSTEM CLEAN; SKIPPING CHECKS",
            "/dev/rsdOa: FILESYSTEM CLEAN; SKIPPING CHECKS",
            "Initializing system Automatic reboot in progress Mounting local filesystems mount: warning: /var/run / dev.db: No such file or directory / dev / hdOa on / (local) / dev / sdOa on / RHAPSODY INSTALL(local, read - only) Starting mach messaging server",
            "Configuring device drivers Using Default table",
            "for EISABus Using Default table",
            "for PCIBus Using Default table",
            "for PS2Keyboard Using Default table",
            "for Inte1824X0",
            "This text is inspired from the original Rhapsody oprrating system",
            "This website was made from scratch",
            "None of this text is particularily important, but it looks pretty awesome!",
            "Do not worry; you will not be forced to look at the messages again in the neat futute."]

var output;
var interval = 0;
var maxInterval = Math.floor(Math.random() * 10)+10
console.log(maxInterval)

setInterval(function() {
    shuffle(text)
    output = text[0] + "<br>";
    // console.log(Math.floor(text.length * Math.random()))
    for (var i = 0; i < (Math.floor(text.length*Math.random()))+1; i++) {
        output = output + text[i]
    }
    interval++
    console.log(interval)
    $(".output-log").append(output + "<br>")
    document.getElementById("output-log").scrollTop = document.getElementById("output-log").scrollHeight
    if (interval >= maxInterval) {
        Cookies.set("loaded","true");
        location.reload();
    }

}, 500)