import Text "mo:base/Text";
import List "mo:base/List";
actor DKeeper{
  type Note = {
    title: Text;
    content: Text;
  };

  var notes: List.List<Note> = List.nil<Note>();

}