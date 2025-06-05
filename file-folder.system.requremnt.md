Problem Statement
Design a class-based file and folder system that demonstrates the Composite Design Pattern.

There should be a root element that can contain both files and folders.

A Folder can contain any number of File or other Folder objects.

A File only holds content.

Requirements:

The Root, Folder, and File classes should implement a common interface IFileSystemItem.

The method printStructure() should:

Print file/folder names recursively for Root and Folder.

Print contents for File.
