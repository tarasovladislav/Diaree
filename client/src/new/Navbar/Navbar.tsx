import './Navbar.css';
import NavbarBox from './MemoryBox/MemoryBox';
import TagBox from './TagBox/TagBox';

const mockData = [
  {
    title: 'Test',
    description: 'Test'
  },
  {
    title: 'Test2',
    description: 'Test2'
  },
  {
    title: 'Test3',
    description: 'Test3'
  },
  {
    title: 'Test4',
    description: 'Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4'
  },
  {
    title: 'Test4',
    description: 'Test4Test4Test4Test4Test4Test4Test4Test4Test4Test4'
  }
]

const mockTags = [
  {
    title: 'Test - (4)'
  },
  {
    title: 'Test2 - (3)'
  },
  {
    title: 'Test2.5'
  },
  {
    title: 'Test3 - (14)'
  },
  {
    title: 'Test2 - (3)'
  },
  {
    title: 'Test2.5'
  },
  {
    title: 'Test2 - (3)'
  },
  {
    title: 'Test2.5'
  },
  {
    title: 'Test - (4)'
  },
  {
    title: 'Test2 - (3)'
  },
  {
    title: 'Test2.5'
  },
  {
    title: 'Test3 - (14)'
  },
  {
    title: 'Test2 - (3)'
  },
  {
    title: 'Test2.5'
  },
  {
    title: 'Test2 - (3)'
  },
  {
    title: 'Test2.5'
  },
  {
    title: 'Test - (4)'
  },
  {
    title: 'Test2 - (3)'
  },
  {
    title: 'Test2.5'
  },
  {
    title: 'Test3 - (14)'
  },
  {
    title: 'Test2 - (3)'
  },
  {
    title: 'Test2.5'
  },
  {
    title: 'Test2 - (3)'
  },
  {
    title: 'Test2.5'
  }
]

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="Title" style={{ paddingBlockEnd: '5px'}} >
        <h2>Dιαɾҽҽ</h2>
      </div>
      <div className="Recent-Memories">
        <h4>Recent memories</h4>
        <NavbarBox data={mockData} />
      </div>
      <div className="Border"></div>
      <div className="Random-Memorie">
        <button>Random memory</button>
      </div>
      <div className="Border" style={{ paddingBlockStart: '0px' }}></div>
      <div className="Tags">
        <h4>Tags</h4>
        <TagBox data={mockTags} />
      </div>
      <footer>
        <div className="Border" style={{ marginBottom: '15px'}}></div>
        <p>&copy; Diarrhea<br />All toilet paper reserved.</p>
      </footer>
    </div>
  )
}

export default Navbar