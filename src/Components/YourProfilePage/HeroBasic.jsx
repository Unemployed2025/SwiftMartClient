import PropTypes from 'prop-types';

function HeroBasic({UserData}) {
  return (
    <div className="flex flex-col items-center justify-center h-96 bg-[#9E1B34]">
      <h1 className="text-7xl font-bold text-fuchsia-500">
        HELLO, {UserData?.name}
      </h1>
      <p className="text-2xl mt-4 text-yellow-600">
        See What you have in your profile
      </p>

    </div>
  );
}
HeroBasic.propTypes = {
  UserData: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default HeroBasic;