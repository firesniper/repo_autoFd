let pgp_indeEnv = {
    str_desktop         : "C:/Users/Administrator/Desktop/" ,
    str_cwr             : "E:/Repos_git/repo_autoFd/" ,
    str_node_me         : "D:/ProgramFiles/node_me/" ,
    dir_tMall           : "E:/Repos_git/repo_tMall_d01_codes/tMall_brow_l7_d01_codes_dev/" 

} ;

let pgp_depeEnv = {
    str_node_js         : pgp_indeEnv.str_cwr + "/" ,
    str_laboRat         : pgp_indeEnv.str_cwr + "/laboRat/" ,
    str_repo_autoFd     : pgp_indeEnv.str_cwr + "/" ,
    str_dir_autoFd      : pgp_indeEnv.str_cwr + "/autoFd/" ,
    str_dist1           : pgp_indeEnv.str_desktop + "/dist1/" ,
    str_dir_append_mls  : pgp_indeEnv.str_cwr + "/dir_append_mls/" ,
    str_node_common_lib : pgp_indeEnv.str_node_me + "/autoFd/node_common_lib/" 
} ;

let pgp_fs = require ( "fs" ) ;
let pgp_gulp = require ( "gulp" ) ;
let pgp_gulpsync = require ( "gulp-sync" ) ( pgp_gulp ) ;

let pgp_gulpLib = require ( "./gulp_lib" ) ;
/*let commonLib = require ( node_common_lib + "/node_common_lib" ) ;
commonLib.init () ;*/
let pgp_libIndeEnv = pgp_gulpLib.pgp_indeEnv ;
let pgp_libDepeEnv = pgp_gulpLib.pgp_depeEnv ;
let pgp_gMod = pgp_gulpLib.pgp_gMod ;

/*pgpGMod.fileInclude = require ( "gulp-file-include" ) ;
pgpGMod.revCollector = require ( "gulp-rev-collector" ) ;
pgpGMod.through2 = require ( "through2" ) ;*/
let pgp_fileInclude = pgp_gulpLib.fnPgp_fileInclude 
( 
    { 
        str_name : "" , 
        ary_depeFn : [] ,
        ary_src : 
        [
            //  pgp_depeEnv.str_dir_append_mls + 
             "./append_mls/*.dev.html"
        ] 
    } 
) ;

let pgp_compileFd_html = pgp_gulpLib.fnPgp_compileFd 
(
    {
        str_name : "html" ,
        ary_depeFn : [ pgp_fileInclude.str_sync ] ,
        compileFdParams : 
        {
            pgp_globParams : 
            {
                // "str_cwd" :  pgp_depeEnv.str_dir_append_mls ,
                "str_cwd" :   "./" ,
                "ary_regPatt" : 
                [ 
                     
                    //  pgp_indeEnv.dir_tMall + "/**/*.combo.html" ,
                    //  pgp_indeEnv.dir_tMall + "/**/css/*.dev.less" ,  
                     "./**/*.combo.html" ,
                     "./**/css/*.dev.less"   
 
                ]
            } ,
            str_srcBaseUri : "http://PH_host:8080/abc/" ,
            str_destBaseUri : "http://localhost:3000/public/" ,
            str_srcVirPath : 2 ,
            "pgp_baseUri_ary" : 
            {
                "^PH_baseUri1%" : 
                [
                    "http://localhost-a:3000/1/" ,
                    "http://remote-a:1111/public/1/"
                ] ,
                "^PH_baseUri2%" : 
                [
                    "http://127.0.0.1-b:8080/2/" ,
                    "http://remote-b:2222/public/2/"
                ] ,
                "^PH_baseUri3%" : 
                [
                    "http://127.0.0.1-c:8080/3/" ,
                    "http://remote-c:3333/public/3/"
                ] ,
            } ,
            str_outputDir : null ,
            str_injSrc : null

        }
    }
) ;
let pgp_compileFd_less = pgp_gulpLib.fnPgp_compileFd 
(
    {
        str_name : "less" ,
        // ary_depeFn : [ pgp_fileInclude.str_sync ] ,
        compileFdParams : 
        {
            pgp_globParams : 
            {
                // "str_cwd" :  pgp_depeEnv.str_dir_append_mls ,
                "str_cwd" :   "./" ,
                "ary_regPatt" : 
                [ 
                     
                    //  pgp_indeEnv.dir_tMall + "/**/*.combo.html" ,
                    //  pgp_indeEnv.dir_tMall + "/**/css/*.dev.less" ,  
                    //  "./**/*.combo.html" ,
                     "./**/css/*.dev.less"   
 
                ]
            } ,
            str_srcBaseUri : "http://PH_host:8080/abc/" ,
            str_destBaseUri : "http://localhost:3000/public/" ,
            str_srcVirPath : 2 ,
            "pgp_baseUri_ary" : 
            {
                "^PH_baseUri1%" : 
                [
                    "http://localhost-a:3000/1/" ,
                    "http://remote-a:1111/public/1/"
                ] ,
                "^PH_baseUri2%" : 
                [
                    "http://127.0.0.1-b:8080/2/" ,
                    "http://remote-b:2222/public/2/"
                ] ,
            } ,
            str_outputDir : null ,
            str_injSrc : null

        }
    }
) ;


let pgp_less2Css = pgp_gulpLib.fnStr_cvt2Css 
( 
    { 
        str_name : "fn_less" , 
        ary_src : 
        [ 
            // pgp_indeEnv.dir_tMall + "/**/css/*.less" 
            "./**/append_mls/css/*.res.less"
        ] ,
        ary_depeFn : [ pgp_compileFd_less.str_sync ]
    } 
) ;

let pgp_sass2Css = pgp_gulpLib.fnStr_cvt2Css 
( 
    { 
        str_name : "fn_sass" , 
        ary_src : [ "./**/append_mls/css/*.scss" ] 
    } 
) ;
// let scss2Css = cvt2Css ( { fn : "scss" , ary_src : [ "./append_mls/css/*.scss" ] , loadMaps : true } ) ;


let str_rmConsole = pgp_gulpLib.fnStr_rmConsole 
(
    {
        str_name : "" ,
        ary_src : [ pgp_libDepeEnv.laboRat + "/inputJs.dev.js" ] ,
        str_dest : pgp_depeEnv.str_node_js + "/dist1"
    }
) ;


pgp_gulp.task
(
    "bwsReload" ,
    function ()
    {
        // gulp.src ( cwr + "**/*.*" )
        pgp_gMod.bwsReload.listen () ;
        pgp_gulp.watch 
        ( 
            "./**/*.*" ,
            function ( event )
            {
                bwsReload.change ( event.path ) ;
            }
        ) ;

    }
) ;

let ary_defTask = 
[ 
    /*"rmConsole" 
    ,*/
    
    
    
    pgp_fileInclude.str_sync
    /*,
    pgp_compileFd_html.str_sync*/
    , 
    pgp_compileFd_less.str_sync
    /*,
    pgp_less2Css.str_sync*/
    /*
    ,
    str_rev_r*/
    /*,
    "revCollector"
    ,*/
    /*"bwsReload" */
] ;
pgp_gulp.task
(
    "less2Css" ,
    [] ,
    function ()
    {
        pgp_gulpsync.start ( [ pgp_less2Css.str_sync ] ) ;
    } 
) ;


pgp_gulp
.task
(
    "default" ,
    ary_defTask ,
    function ( )
    {
         
        
        pgp_compileFd_html.pm_async.then
        (
            function ( resolved )
            {
                pgp_gulp.start
                (
                    resolved
                ) ;
            } ,
            function ( rejected )
            {}
        ) ;
        pgp_less2Css.pm_async.then
        (
            function ( resolved ) 
            {
                pgp_gulp.start 
                ( 
                    [ 
                        resolved
                    ] 
                ) 

            } ,
            function ( rejected )
            {}
        ) ;
           
        pgp_gulp.watch 
        ( 
            "./**/*.dev.html" ,
            [ pgp_fileInclude.str_sync ] 
        ) ;
        pgp_gulp.watch 
        ( 
            "./**/*.dev.combo.html" ,
            [ pgp_compileFd_html.str_sync ] 
        ) ;
        // pgp_gulp.watch 
        // ( 
        //     "./**/*.dev.less" ,
        //     [ pgp_compileFd_less.str_sync ] 
        // ) ;
        // pgp_gulp.watch 
        // ( 
        //     "./**/*.res.less" ,
        //     [ pgp_less2Css.str_sync ] 
        // ) ;
    }
) ;

let str_rev_r = pgp_gulpLib.fnStr_rev 
( 
    { 
        str_name : "rev_js" , 
        ary_src : 
        [ 
            "./append_mls/js/*.js" , 
            "./append_mls/images/*.jpg" , 
            "./append_mls/css/*.css" 
        ] , 
        str_revDest : "./hashFiles/" , 
        str_maniDest : "./manifest/" 
    } 
) ;


let str_revCollector = pgp_gulpLib.fnStr_revCollector 
(
    {
        str_name : "" ,
        ary_src : 
        [
            "./manifest/**/*.json" 
            ,
            "./append_mls/*.combo.html" 
        ] ,
        pgp_revCol : 
        {
            replaceReved : false ,
            dirReplacements : 
            {
                './css/' : '/hashFiles/',
                './js/' : '/hashFiles/', 
                "./images/" : '/hashFiles/' ,
                '/cdn/' : "cdn_2132"
            }
        } ,
        str_dest : "./append_mls/"
    }
) ;



let str_manifest = pgp_gulpLib.fnStr_resetManifest 
(
    {
        str_name : "" ,
        str_cwd : pgp_libIndeEnv.str_cwr + "/dir_append_mls" ,
        ary_src : [ "./manifest/*.json" ] 
    } 
) ;

let ary_revTask =
[
    str_rev_r ,
    // pgp_compileFd 
    // str_manifest 
] ;

pgp_gulp.task
(
    "revCollector" , 
    ary_revTask ,
    function ()
    {
        pgp_gulp.start ( [ /*str_manifest ,*/ str_revCollector ] ) ;
        /*pgp_gulpsync.sync 
        ( 
            str_revCollector ,
            [ 
                // str_manifest  , 
            ] 
        ) ;*/
    }
) ;

let str_copyRevDest = pgp_gulpLib.fnStr_copyDir ( { str_name : "revDest" , ary_src : []  } ) ;


let str_cleanRevDest = pgp_gulpLib.fnStr_cleanDir ( { str_name : "revDest" , ary_src : [] } ) ;


let str_delRevDest = pgp_gulpLib.fnStr_delDir ( { str_name : "revDest" , ary_src : [] } ) ;


