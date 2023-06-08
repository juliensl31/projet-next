export default function Error(props) {
  return (
    <div
      style={{
        background: '#ee6c4d',
        color: 'white',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '15px',
        textAlign: 'center',
      }}
    >
      {props.children}
    </div>
  );
}
