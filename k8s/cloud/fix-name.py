#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""Replace PROJECT_ID with real value for *.yml.tpl files.

   e.g., gcr.io/PROJECT_ID/todoapi --> gcr.io/my_proj/todoapi
"""


import shutil
from tempfile import mkstemp

def sed(pattern, replace, source, dest=None, count=0):
    """Reads a source file and writes the destination file.

    In each line, replaces pattern with replace.

    Args:
        pattern (str): pattern to match (can be re.pattern)
        replace (str): replacement str
        source  (str): input filename
        count (int): number of occurrences to replace
        dest (str):   destination filename, if not given, source will be over written.

    @see https://stackoverflow.com/a/40843600/714426        
    """

    fin = open(source, 'r')
    num_replaced = count

    if dest:
        fout = open(dest, 'w')
    else:
        _, name = mkstemp()
        fout = open(name, 'w')

    for line in fin:
        out = re.sub(pattern, replace, line)
        fout.write(out)

        if out != line:
            num_replaced += 1
        if count and num_replaced > count:
            break
    try:
        fout.writelines(fin.readlines())
    except Exception as E:
        raise E

    fin.close()
    fout.close()

    if not dest:
        shutil.move(name, source)


import glob, os, re, sys

if __name__ == '__main__':

    if len(sys.argv) < 2:
        raise Exception('missing PROJECT_ID as argument.')

    dir_path = os.path.dirname(os.path.realpath(__file__))
    print("Replacing *.yml.tpl files in %s..." % dir_path)

    for filename in glob.glob(os.path.join(dir_path, "*.yml.tpl")):
        #print(filename)
        searchObj = re.search( r'(.+)\.tpl', filename, re.M|re.I)

        if searchObj:
            #print ("searchObj.group() : ", searchObj.group())
            new_filename = searchObj.group(1)
            print(" > %s -> %s" % (os.path.basename(filename), os.path.basename(new_filename)))

            sed("PROJECT_ID", sys.argv[1], filename, new_filename)
            print("   Done.")