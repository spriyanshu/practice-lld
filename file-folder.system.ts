// Problem Statement
// Design a class-based file and folder system that demonstrates the Composite Design Pattern.
// There should be a root element that can contain both files and folders.
// A Folder can contain any number of File or other Folder objects.
// A File only holds content.
// Requirements:
// The Root, Folder, and File classes should implement a common interface IFileSystemItem.
// The method showContent() should:
// Print file/folder names recursively for Root and Folder.
// Print contents for File.

interface IFileSystemItem {
  showContent(indent?: string): void;
}

class FileItem implements IFileSystemItem {
  constructor(private name: string, private content: string) {}

  showContent(indent: string = ''): void {
    console.log(`${indent}📄 ${this.name} - ${this.content}`);
  }
}

class FolderItem implements IFileSystemItem {
  private items: IFileSystemItem[] = [];
  constructor(private name: string) {}
  add(item: IFileSystemItem): void {
    this.items.push(item);
  }
  showContent(indent: string = ''): void {
    console.log(`${indent}📁 ${this.name}`);
    for (const item of this.items) {
      item.showContent(indent + '  ');
    }
  }
}

class RootItem extends FolderItem {
  constructor() {
    super('root');
  }
}

const root = new RootItem();

const srcFolder = new FolderItem('src');
const utilsFolder = new FolderItem('utils');

const file1 = new FileItem('index.ts', "console.log('Hello')");
const file2 = new FileItem('helper.ts', 'export const helper = () => {}');
const readme = new FileItem('README.md', 'Welcome to the repo');

utilsFolder.add(file2);
srcFolder.add(file1);
srcFolder.add(utilsFolder);

root.add(srcFolder);
root.add(readme);

utilsFolder.showContent();
